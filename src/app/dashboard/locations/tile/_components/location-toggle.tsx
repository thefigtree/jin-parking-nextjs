"use client";

import { toggleLocation } from "@/actions/action";
import { Switch } from "@/components/ui/switch";
import { LocationParkingStatus } from "@/types/enum";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import { startTransition, useTransition } from "react";

type SwitchProps = {
  id: string;
  name: string;
  status: string;
};

export default function LocationToggle({ props }: { props: string }) {
  const { id, name, status } = JSON.parse(props) as SwitchProps;

  const [isPending, setIsPending] = useTransition();

  const pathname = usePathname();

  const active = status === LocationParkingStatus.AVAILABLE;

  const handleToggle = () => {
    startTransition(async () => {
      await toggleLocation({
        id: id,
        path: pathname,
      });
    });
  };

  return (
    <div
      className={`flex justify-between ${
        active ? "text-green-400" : "text-gray-400"
      }`}
    >
      {name}
      {isPending ? (
        <Loader></Loader>
      ) : (
        <Switch checked={active} onClick={handleToggle}></Switch>
      )}
    </div>
  );
}
