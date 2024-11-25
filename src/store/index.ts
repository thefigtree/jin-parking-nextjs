import { LatLng } from "@/types/location";
import { create } from "zustand";

export type SpotType = {
  address?: string;
  gpscoords?: LatLng;
  numofspots?: number;
  price?: {
    hourly: number;
  };
};

export interface SpotState {
  data: SpotType;
  updateState: (date: SpotType) => void;
  restart: () => void;
}

export const useSpotStore = create<SpotState>((set) => ({
  data: {
    address: "",
    gpscoords: {
      lat: 0,
      lng: 0,
    },
    numofspots: 1,
    price: {
      hourly: 0,
    },
  },

  updateState: (data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  restart: () =>
    set({
      data: {
        address: "",
        gpscoords: {
          lat: 0,
          lng: 0,
        },
        numofspots: 1,
        price: {
          hourly: 0,
        },
      },
    }),
}));
