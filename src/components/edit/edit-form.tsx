"use client";

import { ParkingLocation } from "@/schemas/location-parking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { locationUpdate } from "@/actions/action";
import { usePathname } from "next/navigation";
import { Loader } from "lucide-react";

const FormSchema = z.object({
  numberofspots: z.coerce
    .number({ invalid_type_error: "숫자만 입력이 가능합니다." })
    .positive({
      message: "1 이상의 숫자여야 합니다.",
    })
    .finite({ message: "유효한 숫자여야 합니다." }),
  hourly: z.coerce
    .number({ invalid_type_error: "숫자만 입력이 가능합니다." })
    .positive({
      message: "1 이상의 숫자여야 합니다.",
    })
    .finite({ message: "유효한 숫자여야 합니다." }),
});

type FormInput = z.infer<typeof FormSchema>;

export default function EditForm({ location }: { location: string }) {
  const [progress, setProgress] = useState(false);

  const pathname = usePathname();

  const parsedLocation = JSON.parse(location) as ParkingLocation;

  const form = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numberofspots: parsedLocation.numberofspots,
      hourly: parsedLocation.price.hourly,
    },
  });

  const onSubmit = async (data: FormInput) => {
    setProgress(true);

    await locationUpdate({
      id: parsedLocation._id as string,
      path: pathname,
      location: {
        address: parsedLocation.address,
        numberofspots: data.numberofspots,
        price: {
          hourly: data.hourly,
        },
      },
    });

    setProgress(false);
  };

  return (
    <div className="sm:container sm:w-1/2 flex flex-col bg-white pt-10 pb-10 p-4 rounded gap-y-4 items-center mt-2">
      <p>{parsedLocation.address}</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex flex-col gap-y-2"
        >
          <FormField
            control={form.control}
            name="hourly"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="입력창"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="numberofspots"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <div className="flex flex-col mt-4">
            {progress ? (
              <Loader></Loader>
            ) : (
              <>
                <Button type="submit">저장하기</Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => window.history.back()}
                >
                  뒤로가기
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
