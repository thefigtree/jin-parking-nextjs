import { Library } from "@googlemaps/js-api-loader";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const libs: Library[] = ["core", "maps", "places", "marker"];

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  let numFormat = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    currencyDisplay: "symbol",
  });

  const formatedAmount = numFormat.format(amount);

  return formatedAmount === "NaN" ? "" : formatedAmount;
}
