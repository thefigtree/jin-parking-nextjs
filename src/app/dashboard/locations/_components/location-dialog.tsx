import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useSpotStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MySpot from "./my-spot";

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

  const handleSubmit = () => {
    // db에 데이터 저장 함수
    console.log(spotStore.data);
  };

  const handleAnother = () => {
    setStep(1);

    spotStore.restart();
  };

  // 단계 증가 핸들러
  const handleNextChange = () => {
    if (step === totalSteps) return;

    setStep((currentStep) => currentStep + 1);
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
                1: <MySpot onNext={handleNextChange}></MySpot>,
              }[step]
            }
          </div>

          <DialogDescription>Fixed the warning</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-col mt-4 w-full space-y-2">
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
