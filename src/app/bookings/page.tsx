import { getServerSession } from "next-auth";
import { BookingItem } from "../_components/BookingItem";
import Header from "../_components/Header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export default async function Bookings() {
  const user = await getServerSession(authOptions);
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (user?.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const finallyBookings = await db.booking.findMany({
    where: {
      userId: (user?.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return (
    <>
      <Header />

      <div className="p-5">
        <h2 className="text-2xl font-bold">Agendamentos</h2>

        <h3 className="text-md text-zinc-400 uppercase mt-5">Confirmados</h3>
        <div className="mt-8 space-y-3">
          {confirmedBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>

        <h3 className="text-md text-zinc-400 uppercase mt-5">finalizados</h3>
        <div className="mt-8">
          {finallyBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </div>
    </>
  );
}
