import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <CardTitle>switch</CardTitle>

        <CardDescription className="text-md">{address}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default LocationCard;
