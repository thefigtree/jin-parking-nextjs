export type LatLng = {
  lat: number;
  lng: number;
};

export type Price = {
  hourly: number;
};

export type UpdateLocationParams = {
  address: string;
  numOfSpots: number;
  price: {
    hourly: number;
  };
};

export type MapParams = {
  id: string;
  gpscoords: LatLng;
  address: string;
  numOfSpots?: number;
  bookedspots?: number;
  price?: Price;
  type?: string;
  status?: string;
  radius?: number;
};
