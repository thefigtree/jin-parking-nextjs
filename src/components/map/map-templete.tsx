"use client";

import {
  buildMapInfoCardContent,
  buildMapInfoCardContentForDestination,
  destinationPin,
  getStreetFromAddress,
  libs,
  parkingPin,
  parkingPinWithIndex,
} from "@/lib/utils";
import { MapAddressType } from "@/types/enum";
import { MapParams } from "@/types/location";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

export default function MapTemplete({ mapParams }: { mapParams: string }) {
  const params = JSON.parse(mapParams) as MapParams[];

  let infoWindow: google.maps.InfoWindow;

  const { isLoaded } = useJsApiLoader({
    nonce: "asdaskjdnkasjnddsnf",
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
        marker.setAttribute(
          "content",
          buildMapInfoCardContent(
            getStreetFromAddress(location.address),
            location.address,
            location.numOfSpots as number,
            location.price?.hourly as number
          )
        );

        marker.content = parkingPinWithIndex(
          getPinType(location),
          index
        ).element;
      } else if (location.type === MapAddressType.ADMIN) {
        marker.setAttribute(
          "content",
          buildMapInfoCardContent(
            getStreetFromAddress(location.address),
            location.address,
            location.numOfSpots as number,
            location.price?.hourly as number
          )
        );

        marker.content = parkingPin(getPinType(location)).element;
      } else {
        const cityCircle = new google.maps.Circle({
          strokeColor: "#00FF00",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#0FF",
          fillOpacity: 0.35,
          map,
          center: {
            lat: params[0].gpscoords.lat,
            lng: params[0].gpscoords.lng,
          },
          radius: location.radius,
        });

        marker.content = destinationPin(getPinType(location)).element;
        marker.setAttribute(
          "content",
          buildMapInfoCardContentForDestination(
            getStreetFromAddress(location.address),
            location.address
          )
        );
      }

      //   마커 클릭 이벤트 함수

      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getAttribute("content"));
        infoWindow.open({
          map,
          anchor: marker,
        });
      });
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
