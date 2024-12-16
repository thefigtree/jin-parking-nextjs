import { MapParams } from "@/types/location";
import { SearchParams } from "../search-bar";
import { MapAddressType } from "@/types/enum";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatAmountForDisplay, getStreetFromAddress } from "@/lib/utils";

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

              <CardDescription className="text-lg font-bold">
                {getStreetFromAddress(loc.address)}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="mb-4 grid grid-cols-1 items-start last:mb-0 last:pb-0">
                <div className="space-y-2 pb-2">
                  <div className="grid grid-cols-2">
                    <p className="text-sm">시간 당:</p>
                    <p className="text-sm">
                      {formatAmountForDisplay(loc.price?.hourly!, "WON")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
}
