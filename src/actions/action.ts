"use server";

import { SearchParams } from "@/components/search-bar";
import { BookingModel } from "@/schemas/booking-parking";
import {
  LocationParking,
  LocationParkingModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { BookingStatus, LocationParkingStatus } from "@/types/enum";
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

  const location = await LocationParkingModel.findById<LocationParking>(id);

  if (location) {
    location.status =
      location.status === LocationParkingStatus.AVAILABLE
        ? LocationParkingStatus.NOTAVAILABLE
        : LocationParkingStatus.AVAILABLE;

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

  const deleteResult = await LocationParkingModel.findByIdAndDelete(id);

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

    await LocationParkingModel.updateOne(
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
  max: number,
  searchParams: SearchParams
) {
  try {
    await connectToDB();

    const start = new Date(
      `${searchParams.arrivingon}T${searchParams.arrivingtime}`
    );
    const end = new Date(
      `${searchParams.arrivingon}T${searchParams.leavingtime}`
    );

    const locationParking: LocationParking[] = await LocationParkingModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [
              searchParams.gpscoords.lng,
              searchParams.gpscoords.lat,
            ],
          },
          $maxDistance: max, // meters
        },
      },
    }).lean();

    const availableLocations = await Promise.all(
      locationParking.map(async (location: LocationParking) => {
        const bookings = await BookingModel.find({
          locationid: location._id,
          status: BookingStatus.BOOKED,
          starttime: {
            $lt: end,
          },
          endtime: {
            $gt: start,
          },
        }).lean();

        if (bookings.length < location.numOfSpots) {
          return { ...location, ...{ bookedspots: bookings.length } };
        } else {
          return {
            ...location,
            ...{ bookedspots: bookings.length, status: LocationParkingStatus },
          };
        }
      })
    );

    return JSON.parse(JSON.stringify(availableLocations));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
