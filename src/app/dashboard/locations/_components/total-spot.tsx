// dashboard/locations/tile 세번째 다이얼로그

import { Button } from "@/components/ui/button";
import { formatAmountForDisplay } from "@/lib/utils";

import { useSpotStore } from "@/store";
import { spotPropsType } from "@/types/step";

export default function TotalSpot({ onPrev }: spotPropsType) {
  const spotStore = useSpotStore();

  return (
    <div className="grid w-full gap-1 5">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">등록 장소 정보</h2>
      <div className="flex flex-col gap-y-2 text-lg text-muted-foreground">
        <p>{spotStore.data.address}</p>
        <p>주차 공간 수: {spotStore.data.numOfSpots}</p>
        <p>
          시간 당:{" "}
          {formatAmountForDisplay(spotStore.data.price?.hourly!, "WON")}
        </p>
      </div>

      <div className="flex justify-between items-center py-4">
        <Button type="button" variant="ghost" onClick={onPrev}>
          &lt; 이전
        </Button>
      </div>
    </div>
  );
}
