import { getTime } from "@/lib/utils";
import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type PropType = {
  onChange: (value: string) => void;
  defaultValue: string | undefined;
  disableTime?: string;
};

export default function TimeSelect(props: PropType) {
  const disableTime: Date = new Date(`2000-01-01T${props.disableTime}:00`);

  return (
    <Select onValueChange={props.onChange} value={props.defaultValue}>
      <FormControl>
        <SelectTrigger>
          <SelectValue
            placeholder={
              <p className="text-muted-foreground">시간을 입력하세요.</p>
            }
          ></SelectValue>
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        {getTime().map((time) =>
          new Date(`2000-01-01T${time.time}:00`) <= disableTime ? (
            <SelectItem disabled key={time.time} value={time.time}>
              {time.display}
            </SelectItem>
          ) : (
            <SelectItem key={time.time} value={time.time}>
              {time.display}
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}
