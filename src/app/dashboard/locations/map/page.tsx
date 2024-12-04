import MapTemplete from "@/components/map/map-templete";
import {
  ParkingLocation,
  ParkingLocationModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { ParkingLocationStatus, MapAddressType } from "@/types/enum";
import { MapParams } from "@/types/location";

export default async function LocationMapPage() {
  await connectToDB();

  const parkingLocations: ParkingLocation[] = await ParkingLocationModel.find(
    {}
  );

  const params: MapParams[] = parkingLocations
    .filter((loc) => loc.status === ParkingLocationStatus.AVAILABLE)
    .map((loc) => ({
      address: loc.address,
      gpscoords: loc.gpscoords,
      price: loc.price,
      numberofspots: loc.numberofspots,
      status: loc.status,
      type: MapAddressType.ADMIN,
      id: loc.id,
    }));

  console.log(params);

  return (
    <div className="p-2">
      <MapTemplete mapParams={JSON.stringify(params)}></MapTemplete>
    </div>
  );
}
