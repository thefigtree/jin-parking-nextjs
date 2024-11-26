"use server";

import {
  LocationParking,
  LocationParkingModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { LocationParkingStatus } from "@/types/enum";
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
