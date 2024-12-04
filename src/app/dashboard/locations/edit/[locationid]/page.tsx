import EditForm from "@/components/edit/edit-form";
import { ParkingLocationModel } from "@/schemas/location-parking";

export default async function LocationEdit({
  params,
}: {
  params: { locationid: string };
}) {
  const location = await ParkingLocationModel.findById(params.locationid);

  return <EditForm location={JSON.stringify(location)}></EditForm>;
}
