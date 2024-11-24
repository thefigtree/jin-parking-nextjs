import {
  LocationParking,
  LocationParkingModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectToDB();

    const formData: FormData = await request.formData();
    const data = formData.get("data") as string;
    const LocationParking = JSON.parse(data) as LocationParking;
    const record = await LocationParkingModel.create<LocationParking>({
      address: LocationParking.address,
      gpscoords: LocationParking.gpscoords,
      location: {
        coordinate: [
          LocationParking.gpscoords.lng,
          LocationParking.gpscoords.lat,
        ],
      },
      numberofspots: LocationParking.numberofspots,
      price: LocationParking.price,
      status: LocationParking.status,
    });

    return NextResponse.json({
      message: "이미 선택한 주차 공간이 있습니다.",
      locationparking: record,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse("Server error", { status: 500 });
  }
}
