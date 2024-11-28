import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import DateSelect from "./date/date.select";
import TimeSelect from "./time/time-select";
import { useEffect } from "react";

const FormSchema = z.object({
  arrivingon: z.string({
    required_error: "날짜는 필수입니다.",
  }),
  //   gpscoords: z.object({
  //     lat: z.number(),
  //     lng: z.number(),
  //   }),
  arrivingtime: z.string({
    required_error: "시간은 필수입니다.",
  }),
  leavingtime: z.string({
    required_error: "시간은 필수입니다.",
  }),
});

export default function SearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      arrivingon: "",
      arrivingtime: "",
      leavingtime: "",
    },
  });

  const arrivingTime = useWatch({
    control: form.control,
    name: "arrivingtime",
  });

  useEffect(() => {
    if (arrivingTime) {
      form.resetField("leavingtime");
    }
  }, [arrivingTime, form]);

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    console.log(formData);
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="grid gap-y-1.5 lg:w-1/2">
        <Label htmlFor="parkingat">주소</Label>
        <Input id="parkingat" placeholder="주소를 입력해주세요."></Input>
      </div>

      <Form {...form}>
        <form
          className="gap-y-2 grid grid-cols-1 lg:grid-cols-4 gap-x-32 items-end"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* 날짜 */}

          <FormField
            control={form.control}
            name="arrivingon"
            render={({ field }) => (
              <FormItem className="lg:w-[250px] grid">
                <FormLabel>날짜</FormLabel>
                <FormControl>
                  <DateSelect field={field} disableDates={true}></DateSelect>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* 대여시간 */}

          <FormField
            control={form.control}
            name="arrivingtime"
            render={({ field }) => (
              <FormItem className="lg:w-[250px] grid">
                <FormLabel>대여 시간</FormLabel>
                <FormControl>
                  <TimeSelect
                    onChange={field.onChange}
                    defaultValue={field.value}
                  ></TimeSelect>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* 반납시간 */}

          <FormField
            control={form.control}
            name="leavingtime"
            render={({ field }) => (
              <FormItem className="lg:w-[250px] grid">
                <FormLabel>반납 시간</FormLabel>
                <FormControl>
                  <TimeSelect
                    disableTime={form.getValues("arrivingtime")}
                    onChange={field.onChange}
                    defaultValue={field.value}
                  ></TimeSelect>
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <Button type="submit">대여하기</Button>
        </form>
      </Form>
    </div>
  );
}
