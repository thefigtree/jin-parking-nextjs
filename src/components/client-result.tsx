import { MapParams } from "@/types/location";
import { SearchParams } from "./search-bar";
import { MapAddressType } from "@/types/enum";
import { Card, CardHeader, CardTitle } from "./ui/card";

export default function ClientResult({
  locations,
  params,
}: {
  locations: MapParams[];
  params: SearchParams;
}) {
  return (
    <>
      {locations
        .filter((loc) => loc.type === MapAddressType.PARKINGLOCATION)
        .map((loc, index) => (
          <Card key={loc.address}>
            <CardHeader>
              <CardTitle className="text-white w-6 h-6 rounded-full bg-black text-center">
                {index + 1}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
    </>
  );
}
