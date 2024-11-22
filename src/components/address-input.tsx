"use client";

import { LatLng } from "@/types/address";
import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { libs } from "@/lib/utils";
import { Input } from "./ui/input";

type AddressInputProps = {
  onSelect: (address: string, gpscoords: LatLng) => void;
  selected?: string;
};

export default function AddressInput({
  onSelect,
  selected,
}: AddressInputProps) {
  const [autoComplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    nonce: "asdaskjdnkasjnddsnf",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: libs,
  });

  const autoCompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded) {
      const koreaBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng({ lat: 35.17318611, lng: 129.082075 }), // 부산 연제구 위도, 경도
        new google.maps.LatLng({ lat: 37.514575, lng: 127.0495556 }) // 서울 강남구 위도, 경도
      );

      const gAutoComplete = new google.maps.places.Autocomplete(
        autoCompleteRef.current as HTMLInputElement,
        {
          bounds: koreaBounds,
          fields: ["formatted_address", "geometry"],
          componentRestrictions: {
            country: ["ko"],
          },
        }
      );

      gAutoComplete.addListener("place_changed", () => {
        const place = gAutoComplete.getPlace();
        const position = place.geometry?.location;

        onSelect(place.formatted_address!, {
          lat: position?.lat()!,
          lng: position?.lng()!,
        });
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    setTimeout(() => (document.body.style.pointerEvents = ""), 0);
  }, []);

  return <Input ref={autoCompleteRef} defaultValue={selected}></Input>;
}
