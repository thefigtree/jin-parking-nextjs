// dashboard/locations/tile 두번째 다이얼로그

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
import { spotPropsType } from "@/types/step";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  numofspots: z.coerce
    .number({ invalid_type_error: "숫자만 입력이 가능합니다." })
    .positive({
      message: "1 이상의 숫자여야 합니다.",
    })
    .finite({ message: "유효한 숫자여야 합니다." }),
});

type NumOfSpotInput = z.infer<typeof FormSchema>;

export default function NumberSpot({ onNext, onPrev }: spotPropsType) {
  const spotStore = useSpotStore();

  const form = useForm<NumOfSpotInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numofspots: spotStore.data.numofspots,
    },
  });

  const onSubmit = (data: NumOfSpotInput, e: any) => {
    spotStore.updateState({
      numofspots: data.numofspots,
    });

    onNext();
    e.preventDefault();
  };

  return (
    <div className="grid w-full gap-1">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">주차 공간 수</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="numofspots"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="원하는 주차공간 수를 입력하세요."
                  ></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField>

          <div className="flex justify-between py-4">
            <Button type="button" onClick={onPrev} variant="ghost">
              &lt; 이전
            </Button>
            <Button type="submit" onClick={onNext} variant="ghost">
              다음 &gt;
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
