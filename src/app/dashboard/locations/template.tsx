import React from "react";
import LocationButton from "./_components/location-button";
import LayoutSwitch from "@/components/layout/layout-switch";
import { Separator } from "@/components/ui/separator";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LocationButton></LocationButton>
      <Separator className="bg-yellow-300 w-full my-4"></Separator>
      <LayoutSwitch></LayoutSwitch>
      {children}
    </div>
  );
}
