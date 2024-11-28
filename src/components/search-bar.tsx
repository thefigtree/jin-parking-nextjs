"use client";

import { LatLng, MapParams } from "@/types/location";
import SearchForm from "./search-form";
import { useState } from "react";
import { findNearbyLocations } from "@/actions/action";

export type SearchParams = {
  address: string;
  gpscoords: LatLng;
  arrivingon: Date;
  arrivingtime: Date;
  leavingtime: Date;
};

export default function SearchBar() {
  const [search, setSearch] = useState<MapParams[]>([]);
  const [half, setHalf] = useState(500);
  const [message, setMessage] = useState(
    "주소, 날짜와 시간을 입력 후 대여하기 버튼을 눌러주세요."
  );
  const [searchParams, setSearchParams] = useState<SearchParams | undefined>();

  const handleSearch = async (params: SearchParams) => {
    console.log(params);

    setMessage("대여중...");

    setSearch([]);

    const searchData = await findNearbyLocations(half, params as SearchParams);

    console.log(searchData);
  };

  return (
    <div className="flex flex-col -mt-16 w-full p-4 py-10 items-start gap-x-2 rounded-2xl bg-gray-100 ring-1 ring-inset ring-gray-900/5">
      <SearchForm onSearch={handleSearch}></SearchForm>
      {search.length > 0 ? (
        <p>결과</p>
      ) : (
        <p className="text-center pt-12 pb-12 text-xl text-slate-400">
          {message}
        </p>
      )}
    </div>
  );
}
