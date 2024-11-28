import { BookingStatus } from "@/types/enum";
import mongoose, { Document, model, models, Schema } from "mongoose";

export interface Booking extends Document {
  locationid: Object;
  userid: string;
  bookingdate: Date;
  starttime: Date;
  endtime: Date;
  timeoffset: number;
  amount: number;
  phone: string;
  plate: string;
  status: string;
  stripesessionid: string;
}

const BookingSchema = new Schema<Booking>(
  {
    locationid: {
      type: mongoose.Types.ObjectId,
      ref: "주차 장소",
      default: null,
    },
    userid: String,
    bookingdate: Date,
    starttime: Date,
    endtime: Date,
    plate: String,
    phone: String,
    timeoffset: Number,
    amount: Number,
    status: {
      type: String,
      default: BookingStatus.PENDING,
    },
    stripesessionid: String,
  },
  {
    timestamps: true,
  }
);

export const BookingModel = models.Booking || model("Booking", BookingSchema);
