import { ControllerRenderProps } from "react-hook-form";
import { format, sub } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "../ui/calendar";

type PropType = {
  field: ControllerRenderProps<any>;
  disableDates: boolean;
};

export default function DateSelect(params: PropType) {
  const disabled = params.disableDates
    ? (date: Date) => date < sub(new Date(), { days: 1 })
    : [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !params.field.value && "text-muted-foreground"
            )}
          >
            {params.field.value ? (
              format(params.field.value, "PPP")
            ) : (
              <span>날짜를 설정하세요.</span>
            )}
            <Calendar1Icon className="ml-auto h-4 w-4 opacity-50"></Calendar1Icon>
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto -p-0" align="start">
        <Calendar
          mode="single"
          selected={params.field.value}
          onSelect={params.field.onChange}
          disabled={disabled}
          initialFocus
        ></Calendar>
      </PopoverContent>
    </Popover>
  );
}
