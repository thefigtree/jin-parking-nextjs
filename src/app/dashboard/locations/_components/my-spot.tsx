import AddressInput from "@/components/address-input";
import { useSpotStore } from "@/store";
import { LatLng } from "@/types/address";
import { spotPropsType } from "@/types/spot";

import { useState } from "react";

export default function MySpot({ onNext }: spotPropsType) {
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
    <div className="grid w-full gap-1 5">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">주소</h2>

      <AddressInput
        onSelect={handleAddressSelect}
        selected={spotStore.data.address}
      ></AddressInput>
    </div>
  );
}
