import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationToggle from "./location-toggle";
import { formatAmountForDisplay } from "@/lib/utils";
import LocationDelete from "./location-delete";

type Props = {
  id: string;
  name: string;
  address: string;
  numberOfSpots: number;
  spotsBooked: number;
  spotsAvailable: number;
  status: string;
  price: {
    hourly: number;
  };
};

const LocationCard: React.FC<Props> = ({
  id,
  name,
  address,
  numberOfSpots,
  spotsBooked,
  spotsAvailable,
  status,
  price,
}) => {
  return (
    <Card className="w-full lg:w=[350px]">
      <CardHeader>
        <CardTitle>
          <LocationToggle
            props={JSON.stringify({
              id: id,
              name: name,
              status: status,
            })}
          ></LocationToggle>
        </CardTitle>
        <CardDescription className="text-md">{address}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 grid grid-cols-1 items-start pb-4">
          <div className="space-x-2">
            <p className="text-sm font-medium leading-none">
              시간 당: {formatAmountForDisplay(price.hourly, "WON")}
            </p>
            <p className="text-sm font-medium leading-none">
              주차 공간 수: {numberOfSpots}
            </p>

            <hr />

            <p className="text-sm font-medium leading-none">
              예약된 주차 공간: {spotsBooked}
            </p>
            <p className="text-sm font-medium leading-none">
              예약가능한 주차 공간: {spotsAvailable}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <LocationDelete props={JSON.stringify({ id: id })}></LocationDelete>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
