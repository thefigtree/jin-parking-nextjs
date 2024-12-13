"use server";

import { SearchParams } from "@/components/search-bar";
import { BookingModel } from "@/schemas/booking-parking";
import {
  ParkingLocation,
  ParkingLocationModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { BookingStatus, ParkingLocationStatus } from "@/types/enum";
import { UpdateLocationParams } from "@/types/location";
import { revalidatePath } from "next/cache";

export async function toggleLocation({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await connectToDB();

  const location = await ParkingLocationModel.findById<ParkingLocation>(id);

  if (location) {
    location.status =
      location.status === ParkingLocationStatus.AVAILABLE
        ? ParkingLocationStatus.NOTAVAILABLE
        : ParkingLocationStatus.AVAILABLE;

    const result = await location.save();

    if (result) {
      revalidatePath(path);
    }
  }
}

// Location Api 삭제 핸들러

export async function locationDelete({
  id,
  path,
}: {
  id: string;
  path: string;
}) {
  await connectToDB();

  const deleteResult = await ParkingLocationModel.findByIdAndDelete(id);

  if (deleteResult) {
    revalidatePath(path);
  }
}

// Location Api 업데이트 핸들러

export async function locationUpdate({
  id,
  path,
  location,
}: {
  id: string;
  path: string;
  location: UpdateLocationParams;
}) {
  try {
    await connectToDB();

    await ParkingLocationModel.updateOne(
      {
        _id: id,
      },
      {
        $set: location,
      }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);

    throw error;
  }
}

// 데이터 근처 지역 핸들러

export async function findNearbyLocations(
  maxDistance: number,
  searchParams: SearchParams
) {
  try {
    await connectToDB();

    const startTime = new Date(
      `${searchParams.arrivingon}T${searchParams.arrivingtime}`
    );
    const endTime = new Date(
      `${searchParams.arrivingon}T${searchParams.leavingtime}`
    );

    const parkingLocations: ParkingLocation[] = await ParkingLocationModel.find(
      {
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [
                searchParams.gpscoords.lng,
                searchParams.gpscoords.lat,
              ],
            },
            $maxDistance: maxDistance, // meters
          },
        },
      }
    ).lean();

    const availableLoc = await Promise.all(
      parkingLocations.map(async (location: ParkingLocation) => {
        const bookings = await BookingModel.find({
          locationid: location._id,
          status: BookingStatus.BOOKED,
          starttime: {
            $lt: endTime,
          },
          endtime: {
            $gt: startTime,
          },
        }).lean();

        if (bookings.length < location.numberofspots) {
          return { ...location, ...{ bookedspots: bookings.length } };
        } else
          return {
            ...location,
            ...{
              bookedspots: bookings.length,
              status: ParkingLocationStatus.FULL,
            },
          };
      })
    );

    return JSON.parse(JSON.stringify(availableLoc));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
