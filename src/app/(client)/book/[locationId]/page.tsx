"use client";

import { getParkingLocation } from "@/actions/action";
import { ParkingLocation } from "@/schemas/location-parking";
import { differenceInMinutes } from "date-fns";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

const FormSchema = z.object({
  platenum: z.string().min(1, {
    message: "1개 이상 선택해주세요.",
  }),
});

export default function BookPage() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<ParkingLocation>();

  const params = useParams<{ locationId: string }>();

  const locationId = params.locationId;
  const searchParams = useSearchParams();
  const date = searchParams.get("날짜");
  const startTime = searchParams.get("대여시간");
  const endTime = searchParams.get("반납시간");
  const calculatingHours =
    useMemo(
      () =>
        differenceInMinutes(
          new Date(`${date}T${endTime}`),
          new Date(`${date}T${startTime}`)
        ),
      [date, startTime, endTime]
    ) / 60;

  useEffect(() => {
    (async () => {
      const location = await getParkingLocation(locationId);

      setLocation(location as ParkingLocation);
    })();
  }, []);

  return <div></div>;
}
