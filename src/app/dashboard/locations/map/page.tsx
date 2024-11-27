import MapTemplete from "@/components/map/map-templete";
import {
  LocationParking,
  LocationParkingModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { LocationParkingStatus, MapAddressType } from "@/types/enum";
import { MapParams } from "@/types/location";

export default async function LocationMapPage() {
  await connectToDB();

  const locationParking: LocationParking[] = await LocationParkingModel.find(
    {}
  );

  const params: MapParams[] = locationParking
    .filter((location) => location.status === LocationParkingStatus.AVAILABLE)
    .map((location) => ({
      address: location.address,
      gpscoords: location.gpscoords,
      price: location.price,
      numberofspots: location.numOfSpots,
      status: location.status,
      type: MapAddressType.ADMIN,
      id: location.id,
    }));

  console.log(params);

  return (
    <div className="p-2">
      <MapTemplete mapParams={JSON.stringify(params)}></MapTemplete>
    </div>
  );
}
