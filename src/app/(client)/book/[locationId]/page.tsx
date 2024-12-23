"use client";

import { getParkingLocation } from "@/actions/action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatAmountForDisplay, getStreetFromAddress } from "@/lib/utils";
import { ParkingLocation } from "@/schemas/location-parking";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInMinutes, format } from "date-fns";
import { ArrowRight, Loader } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  platenum: z.string().min(1, {
    message: "1개 이상 선택해주세요.",
  }),
});

export default function BookPage() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<ParkingLocation>();

  const params = useParams<{ locationId: string }>();

  const locationId = params.locationId;
  const searchParams = useSearchParams();
  const date = searchParams.get("날짜");
  const startTime = searchParams.get("대여시간");
  const endTime = searchParams.get("반납시간");
  const calculatingHours =
    useMemo(
      () =>
        differenceInMinutes(
          new Date(`${date}T${endTime}`),
          new Date(`${date}T${startTime}`)
        ),
      [date, startTime, endTime]
    ) / 60;

  useEffect(() => {
    (async () => {
      const location = await getParkingLocation(locationId);

      setLocation(location as ParkingLocation);
    })();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platenum: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const data = new FormData();
    const amount = calculatingHours * location?.price.hourly!;

    data.append("address", getStreetFromAddress(location?.address!));
    data.append("amount", `${amount}`);
    data.append("locationid", `${location?._id}`);
    data.append("bookingdate", date!);
    data.append("starttime", startTime!);
    data.append("endtime", endTime!);
    data.append("plate", formData.platenum);
  }

  return (
    <div className="h-full">
      <main className="sm:-mt-16 sm:container flex flex-col items-center">
        <div className="grid grid-cols-3 w-[400px] sm:w-[700px] p-4 bg bg-yellow-300">
          <div className="space-y-1 sm:justify-self-center">
            <h4 className="flex items-center text-gray-500">
              <ArrowRight className="mr-2 w-5 h-5"></ArrowRight>
              들어오는 날
            </h4>

            <p className="text-sm font-bold">
              {format(new Date(`${date}T${startTime}`), "MMM, dd yyyy HH:mm a")}
            </p>
          </div>

          <div className="h-10 self-center justify-self-center">
            <Separator
              className="bg-gray-400"
              orientation="vertical"
            ></Separator>
          </div>

          <div className="space-y-1 sm:justify-self-center">
            <h4 className="flex items-center text-gray-500">
              나가는 날<ArrowRight className="ml-2 w-5 h-5"></ArrowRight>
            </h4>

            <p className="text-sm font-bold">
              {format(new Date(`${date}T${endTime}`), "MMM, dd yyyy HH:mm a")}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white w-[400px] sm:w-[700px] border p-4 shadow flex flex-col pt-12 pb-12 space-y-4"
          >
            <div>
              {location && (
                <p className="font-bold text-xl">
                  {getStreetFromAddress(location.address)}
                </p>
              )}
            </div>

            <div className="flex flex-col bg-yellow-200 p-4 gap-y-2 rounded">
              <div className="flex justify-between text-sm font-bold">
                <p>시간 당</p>
                <p>
                  {location
                    ? formatAmountForDisplay(location.price.hourly, "WON")
                    : "...."}
                </p>
              </div>

              <div className="flex justify-between text-sm font-bold">
                <p>{calculatingHours} 시간</p>
                <p>
                  {location
                    ? formatAmountForDisplay(
                        calculatingHours * location.price.hourly,
                        "WON"
                      )
                    : "...."}
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="platenum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>차량 번호판</FormLabel>
                  <FormControl>
                    <Input
                      className="uppercase"
                      placeholder="차량 번호판을 입력하세요."
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormDescription>
                    등록된 차량의 번호판이 일치하지 않는 경우, 불법 주정차 및
                    주차위반으로 간주 되어 과태료가 부과될 수 있습니다.
                  </FormDescription>
                </FormItem>
              )}
            ></FormField>

            {loading ? <Loader></Loader> : <Button>결제하기</Button>}
          </form>
        </Form>
      </main>
    </div>
  );
}
