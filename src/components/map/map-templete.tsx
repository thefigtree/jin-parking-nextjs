"use client";

import {
  buildMapInfoCardContent,
  getStreetFromAddress,
  libs,
  parkingPin,
} from "@/lib/utils";
import { MapAddressType } from "@/types/enum";
import { MapParams } from "@/types/location";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

export default function MapTemplete({ mapParams }: { mapParams: string }) {
  const params = JSON.parse(mapParams) as MapParams[];

  let infoWindow: google.maps.InfoWindow;

  const { isLoaded } = useJsApiLoader({
    nonce: "477d4456-f7b5-45e2-8945-5f17b3964752",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  });

  const mapRef = useRef<HTMLDivElement>(null);

  const getPinType = (location: MapParams): string => {
    return location.type === MapAddressType.DESTINATION
      ? "parking_destination_tr"
      : "parking_pin_tr";
  };

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          lat: params[0].gpscoords.lat,
          lng: params[0].gpscoords.lng,
        },
        zoom: 14,
        mapId: "MY-MAP-ID-1234",
      };

      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      );

      setMarker(gMap);
    }
  }, [isLoaded]);

  //   구글맵 Api에 커스텀마커 함수
  function setMarker(map: google.maps.Map) {
    infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
    });

    params.map((location, index) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: location.gpscoords,
        title: location.address,
      });

      if (location.type === MapAddressType.PARKINGLOCATION) {
      } else if (location.type === MapAddressType.ADMIN) {
        marker.setAttribute(
          "content",
          buildMapInfoCardContent(
            getStreetFromAddress(location.address),
            location.address,
            location.numberofspots as number,
            location.price?.hourly as number
          )
        );

        marker.content = parkingPin(getPinType(location)).element;
      } else {
      }
    });
  }

  return (
    <div className="flex flex-col space-y-4">
      {isLoaded ? (
        <div style={{ height: "600px" }} ref={mapRef}></div>
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
}
