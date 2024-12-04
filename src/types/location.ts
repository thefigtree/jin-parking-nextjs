export type LatLng = {
  lat: number;
  lng: number;
};

export type Price = {
  hourly: number;
};

export type UpdateLocationParams = {
  address: string;
  numberofspots: number;
  price: {
    hourly: number;
  };
};

export type MapParams = {
  id: string;
  gpscoords: LatLng;
  address: string;
  numberofspots?: number;
  bookedspots?: number;
  price?: Price;
  type?: string;
  status?: string;
  radius?: number;
};
