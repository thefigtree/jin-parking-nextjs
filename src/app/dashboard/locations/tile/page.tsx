import {
  ParkingLocation,
  ParkingLocationModel,
} from "@/schemas/location-parking";
import { connectToDB } from "@/service/db";
import { getStreetFromAddress } from "@/lib/utils";
import LocationCard from "./_components/location-card";

export default async function LocationTilePage() {
  await connectToDB();

  const location: ParkingLocation[] = (await ParkingLocationModel.find({})) as [
    ParkingLocation
  ];

  console.log(location);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 p-2">
      {location.map((location) => (
        <LocationCard
          key={location.id}
          id={location.id}
          name={getStreetFromAddress(location.address)}
          address={location.address}
          numberOfSpots={location.numberofspots}
          spotsAvailable={4}
          spotsBooked={6}
          status={location.status}
          price={location.price}
        ></LocationCard>
      ))}
    </div>
  );
}
