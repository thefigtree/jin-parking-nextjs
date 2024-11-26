import EditForm from "@/components/edit/edit-form";
import { LocationParkingModel } from "@/schemas/location-parking";

export default async function LocationEdit({
  params,
}: {
  params: { id: string };
}) {
  const location = await LocationParkingModel.findById(params.id);

  return <EditForm location={JSON.stringify(location)}></EditForm>;
}
