import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useSpotStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LocationSpot from "./location-spot";
import NumberSpot from "./number-spot";
import PriceSpot from "./price-spot";
import TotalSpot from "./total-spot";
import { toast } from "sonner";

const totalSteps = 4;

const stepIncrement = 100 / totalSteps;

type Props = {
  id?: string | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LocationDialog({ id = null, open, setOpen }: Props) {
  const [step, setStep] = useState(1);
  const [submit, setSubmit] = useState(false);

  const spotStore = useSpotStore();

  const router = useRouter();

  useEffect(() => {
    setStep(1);

    // fetch data
    const fetchData = () => {
      console.log("fetch data");
    };

    if (id && open) {
      fetchData();
    } else {
      spotStore.restart();
    }
  }, [id, open]);

  const handleSubmit = async () => {
    // db에 데이터 저장 함수
    setSubmit(true);

    const data = new FormData();

    data.set("data", JSON.stringify(spotStore.data));

    const result = await fetch("/api/location/new", {
      method: "POST",
      body: data,
    });

    setSubmit(false);

    if (result.ok) {
      toast.success("주차 장소가 등록 되었습니다.");

      router.refresh();
    } else {
      toast.error("주차 장소를 등록할 수 없습니다.");
    }
  };

  const handleAnother = () => {
    setStep(1);

    spotStore.restart();
  };

  // 다음 페이지 이동 핸들러
  const handleNextChange = () => {
    if (step === totalSteps) return;

    setStep((currentStep) => currentStep + 1);
  };

  // 이전 페이지 이동 핸들러
  const handlePrevChange = () => {
    if (step === 1) return;

    setStep((currentStep) => currentStep - 1);
  };

  const handleOnInteracOutside = (e: Event) => {
    const classes: Array<Array<string>> = [];

    e.composedPath().forEach((el: any) => {
      if (el.classList) {
        classes.push(Array.from(el.classList));
      }
    });

    if (classes.join("-").includes("pac-container")) {
      e.preventDefault();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={handleOnInteracOutside}>
        <DialogHeader>
          <DialogTitle>내 장소 보기</DialogTitle>
          <div className="space-y-8">
            <Progress value={step * stepIncrement}></Progress>
            {
              {
                1: <LocationSpot onNext={handleNextChange}></LocationSpot>,
                2: (
                  <NumberSpot
                    onPrev={handlePrevChange}
                    onNext={handleNextChange}
                  ></NumberSpot>
                ),
                3: (
                  <PriceSpot
                    onPrev={handlePrevChange}
                    onNext={handleNextChange}
                  ></PriceSpot>
                ),
                4: (
                  <TotalSpot
                    onNext={handleNextChange}
                    onPrev={handlePrevChange}
                  ></TotalSpot>
                ),
              }[step]
            }
          </div>
        </DialogHeader>

        <DialogFooter>
          <div
            className={`${
              step < totalSteps
                ? "hidden"
                : "flex flex-col mt-4 w-full space-y-2"
            }`}
          >
            <Button type="button" onClick={handleSubmit}>
              등록하기
            </Button>
            <Button type="button" variant="outline" onClick={handleAnother}>
              다른 장소 보기
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
