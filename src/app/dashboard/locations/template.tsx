import React from "react";
import LocationButton from "./_components/location-button";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <LocationButton></LocationButton>
      {children}
    </div>
  );
}
