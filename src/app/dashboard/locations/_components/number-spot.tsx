import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSpotStore } from "@/store";
import { spotPropsType } from "@/types/spot";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  numberofspots: z.coerce
    .number({ invalid_type_error: "숫자만 입력이 가능합니다." })
    .positive({
      message: "1 이상의 숫자여야 합니다.",
    })
    .finite({ message: "유효한 숫자여야 합니다." }),
});

type NumberOfSpotInput = z.infer<typeof FormSchema>;

export default function NumberSpot({ onNext, onPrev }: spotPropsType) {
  const spotStore = useSpotStore();

  const form = useForm<NumberOfSpotInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numberofspots: spotStore.data.numofspots,
    },
  });

  const onSubmit = (data: NumberOfSpotInput) => {
    spotStore.updateState({
      numofspots: data.numberofspots,
    });
  };

  return (
    <div className="grid w-full gap-1">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">주차 공간 수</h2>

      <Form {...form}>
        <form onScroll={form.handleSubmit(onSubmit)}>
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

          <div className="flex justify-between py-4">
            <Button type="button" onClick={onPrev} variant="ghost">
              &lt; 이전
            </Button>
            <Button type="button" variant="ghost">
              다음 &gt;
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
