"use client";

import { locationDelete } from "@/actions/action";
import ConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";

type DeleteProps = {
  id: string;
};

export default function LocationDelete({ props }: { props: string }) {
  const { id } = JSON.parse(props) as DeleteProps;

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const handleConfirm = () => {
    setOpen(true);

    startTransition(async () => {
      await locationDelete({
        id: id,
        path: pathname,
      });
    });
  };

  return (
    <>
      {isPending ? (
        "삭제중..."
      ) : (
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Trash2Icon color="red"></Trash2Icon>
        </Button>
      )}

      <ConfirmDialog
        message="주차 장소 정보를 정말 삭제하시겠습니까?"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      ></ConfirmDialog>
    </>
  );
}
