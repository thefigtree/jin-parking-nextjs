import { LocationParkingStatus } from "@/types/enum";
import { LatLng, Price } from "@/types/location";
import { Document, Schema, model, models } from "mongoose";

export interface LocationParking extends Document {
  address: string;
  gpscoords: LatLng;
  numberofspots: number;
  price: Price;
  status: string;
  bookedspots?: number;
  location: {
    type: string;
    coordinates: [number];
  };
}

const LocationParkingSchema = new Schema<LocationParking>(
  {
    address: String,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },
    gpscoords: {
      lat: Number,
      lng: Number,
    },
    numberofspots: Number,
    price: {
      hourly: Number,
    },
    status: {
      type: String,
      default: LocationParkingStatus.AVAILABLE,
    },
  },
  {
    timestamps: true,
  }
);

export const LocationParkingModel =
  models.LocationParking || model("LocationParking", LocationParkingSchema);
