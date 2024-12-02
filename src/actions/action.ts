"use server";

import { SearchParams } from "@/components/search-bar";
import {
  LocationParking,
  LocationParkingModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { LocationParkingStatus } from "@/types/enum";
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

export async function findNearbyLocations(
  maxDistance: number,
  searchParams: SearchParams
) {}

// 데이터 근처 지역 핸들러
