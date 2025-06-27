"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface GetBookingsProps {
  serviceId: string;
  date: Date;
}

export const getBookings = async (params: GetBookingsProps) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(params.date),
        gte: startOfDay(params.date),
      },
    },
  });
  return bookings;
};
