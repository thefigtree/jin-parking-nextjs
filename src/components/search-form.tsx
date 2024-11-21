import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  arrivingon: z.string({
    required_error: "날짜는 필수입니다.",
  }),
  gpscoords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
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
      leavingtime: "",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    console.log(formData);
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="grid gap-y-1.5 lg:w-1/2">
        <Label htmlFor="parkingat">주소창</Label>
        <Input id="parkingat" placeholder="address"></Input>
      </div>

      <Form {...form}>
        <form
          className="gap-y-2 grid grid-cols-1 lg:grid-cols-4 gap-x-32 items-end"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="arrivingon"
            render={({ field }) => (
              <FormItem className="lg:w-[250px] grid">
                <FormLabel>도착 시간</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="date"></Input>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        </form>
      </Form>
    </div>
  );
}
