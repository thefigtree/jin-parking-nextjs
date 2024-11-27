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
