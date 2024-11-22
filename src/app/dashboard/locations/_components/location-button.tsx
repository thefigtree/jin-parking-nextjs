"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function LocationButton() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col">
        <Button className="self-end" onClick={() => setOpen(true)}>
          <PlusIcon className="mr-2"></PlusIcon>
          위치를 추가해야 합니다.
        </Button>
      </div>
    </div>
  );
}
