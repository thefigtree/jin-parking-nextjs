// dashboard/locations/tile 첫번째 다이얼로그

import AddressInput from "@/components/address-input";
import { Button } from "@/components/ui/button";
import { useSpotStore } from "@/store";
import { LatLng } from "@/types/address";
import { spotPropsType } from "@/types/spot";

import { useState } from "react";

export default function LocationSpot({ onNext }: spotPropsType) {
  const [message, setMessage] = useState<string>("");

  const spotStore = useSpotStore();

  const onSubmit = () => {
    if (spotStore.data.address) {
      onNext();
    } else {
      setMessage("주소를 입력해야 합니다.");
    }
  };

  const handleAddressSelect = (address: string, gpscoords: LatLng) => {
    spotStore.updateState({
      address: address,
      gpscoords: gpscoords,
    });
  };

  return (
    <div className="grid w-full gap-1">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">주소</h2>

      <AddressInput
        onSelect={handleAddressSelect}
        selected={spotStore.data.address}
      ></AddressInput>

      <p className="text-red-500 text-sm">{message}</p>

      <div className="flex justify-end py-4">
        <Button type="submit" onClick={onSubmit} variant="ghost">
          다음 &gt;
        </Button>
      </div>
    </div>
  );
}
