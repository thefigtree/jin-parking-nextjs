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

export function getStreetFromAddress(address: string) {
  return address.split(",")[0];
}

// 구글맵

export const buildMapInfoCardContent = (
  title: string,
  address: string,
  totalSpots: number,
  price: number
): string => {
  return `
  <div class="map_infocard_content">
    <div class="map_infocard_title">${title}</div>
    <div class="map_infocard_body">
    <div>${address}</div>
    <hr />
    <div>Total spots: ${totalSpots}</div>
    <div>Hourly price: ${formatAmountForDisplay(price, "CAD")}</div>
    </div>
    
</div>
`;
};

export const parkingPin = (type: string) => {
  const glyphImg = document.createElement("div");

  glyphImg.innerHTML = `  <div class="map_pin_container">
      <img src='http://localhost:3000/${type}.png' />
    </div>`;

  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg,
  });

  return pinElement;
};
