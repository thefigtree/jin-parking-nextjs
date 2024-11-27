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
    <div>주차 공간 수: ${totalSpots}</div>
    <div>시간 당: ${formatAmountForDisplay(price, "WON")}</div>
    </div>
    
</div>
`;
};

export const buildMapInfoCardContentForDestination = (
  title: string,
  address: string
): string => {
  return `
  <div class="map_infocard_content">
      <div class="map_infocard_title">${title}</div>
      <div class="map_infocard_body">
      <div>${address}</div>
      </div>
      
  </div>`;
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

export const parkingPinWithIndex = (type: string, index: number) => {
  const glyphImg = document.createElement("div");

  glyphImg.innerHTML = `  <div class="map_pin_container">
  <div class"map_pin_id><span>${index}</span></div>
      <img src='http://localhost:3000/${type}.png' />
    </div>`;

  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg,
  });

  return pinElement;
};

export const destinationPin = (type: string) => {
  const glyphImg = document.createElement("img");
  glyphImg.src = `http://localhost:3000/${type}.png`;
  const pinElement = new google.maps.marker.PinElement({
    glyph: glyphImg,
  });

  return pinElement;
};
