import {
  ParkingLocation,
  ParkingLocationModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectToDB();

    const formData: FormData = await request.formData();
    const data = formData.get("data") as string;
    const ParkingLocation = JSON.parse(data) as ParkingLocation;
    const record = await ParkingLocationModel.create<ParkingLocation>({
      address: ParkingLocation.address,
      gpscoords: ParkingLocation.gpscoords,
      location: {
        coordinates: [
          ParkingLocation.gpscoords.lng,
          ParkingLocation.gpscoords.lat,
        ],
      },
      numberofspots: ParkingLocation.numberofspots,
      price: ParkingLocation.price,
      status: ParkingLocation.status,
    });

    return NextResponse.json({
      message: "이미 선택한 주차 공간이 있습니다.",
      parkinglocation: record,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse("Server error", { status: 500 });
  }
}
