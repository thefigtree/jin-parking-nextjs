import React from "react";
import LocationButton from "./_components/location-button";
import LayoutSwitch from "@/components/layout/layout-switch";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LocationButton></LocationButton>
      <LayoutSwitch></LayoutSwitch>
      {children}
    </div>
  );
}
