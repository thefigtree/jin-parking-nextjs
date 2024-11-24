import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSpotStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const SpotStore = useSpotStore();

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
      SpotStore.restart();
    }
  }, [id, open]);

  const handleSubmit = () => {
    // db에 데이터 저장 함수
    console.log(SpotStore.data);
  };

  const handleAnother = () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>내 장소 보기</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
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
