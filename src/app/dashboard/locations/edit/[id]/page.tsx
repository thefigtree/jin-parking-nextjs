import { LocationParkingModel } from "@/schemas/location-parking";

export default async function LocationEdit({
  params,
}: {
  params: { id: string };
}) {
  const location = await LocationParkingModel.findById(params.id);

  return <div>edit {location.address}</div>;
}
