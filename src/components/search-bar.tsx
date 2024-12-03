"use client";

import { LatLng, MapParams } from "@/types/location";
import SearchForm from "./search-form";
import { useState } from "react";
import { findNearbyLocations } from "@/actions/action";
import { LocationParking } from "@/schemas/location-parking";
import { MapAddressType } from "@/types/enum";
import MapTemplete from "./map/map-templete";

export type SearchParams = {
  address: string;
  gpscoords: LatLng;
  arrivingon: Date;
  arrivingtime: Date;
  leavingtime: Date;
};

export default function SearchBar() {
  const [search, setSearch] = useState<MapParams[]>([]);
  const [searchRadius, setSearchRadius] = useState(500);
  const [message, setMessage] = useState(
    "주소, 날짜와 시간을 입력 후 대여하기 버튼을 눌러주세요."
  );
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>();

  const handleSearch = async (params: SearchParams) => {
    console.log(params);

    setMessage("불러 오는 중...");

    setSearch([]);

    const searchData = await findNearbyLocations(
      searchRadius,
      params as SearchParams
    );

    const mapParams: MapParams[] = searchData.map((loc: LocationParking) => ({
      address: loc.address,
      gpscoords: loc.gpscoords,
      price: loc.price,
      numofspots: loc.numOfSpots,
      bookedspots: loc.bookedspots,
      status: loc.status,
      type: MapAddressType.PARKINGLOCATION,
      id: loc._id,
    }));

    if (mapParams.length > 0) {
      mapParams.unshift({
        address: params.address as string,
        gpscoords: params.gpscoords as LatLng,
        type: MapAddressType.DESTINATION,
        radius: searchRadius,
        id: "",
      });

      setSearch([...mapParams]);
      setSearchParams(params);
    } else {
      setMessage("근처에 주차장이 없습니다.");
    }
  };

  return (
    <div className="flex flex-col -mt-16 w-full p-4 py-10 items-start gap-x-2 rounded-2xl bg-gray-100 ring-1 ring-inset ring-gray-900/5">
      <SearchForm onSearch={handleSearch}></SearchForm>
      {search.length > 0 ? (
        <div className="flex">
          <div className="p-1 flex-none w-56 overflow-auto h-[600px]">
            결과를 불러 왔습니다.
          </div>
          <div className="flex-1">
            <MapTemplete mapParams={JSON.stringify(search)}></MapTemplete>
          </div>
        </div>
      ) : (
        <p className="text-center pt-12 pb-12 text-xl text-slate-400">
          {message}
        </p>
      )}
    </div>
  );
}
