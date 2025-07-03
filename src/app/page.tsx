import Header from "./_components/Header";

import Image from "next/image";

import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";
import { QuickSearch } from "./_components/QuickSearch";
import { BookingItem } from "./_components/BookingItem";
import { quickSearchOptions } from "./quickSearchList";
import { Button } from "./_components/ui/button";
import { FootprintsIcon } from "lucide-react";
import Link from "next/link";
import { Home } from "./_components/Home";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

export default async function App() {
  const user = await getServerSession(authOptions);
  const bookings = user?.user
    ? await db.booking.findMany({
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
      })
    : [];
  const barberShops = await db.barbershop.findMany();
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <div className="p-4">
        <Home />
      </div>
      <div className="p-5">
        <div className="">
          <QuickSearch />
        </div>
        <div className="flex items-center gap-5 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              size="lg"
              variant="outline"
              className="w-32 h-12"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?search=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={20}
                  height={20}
                />
                <p>{option.title}</p>
              </Link>
            </Button>
          ))}
          <Button size="lg" variant="outline" className="w-32 h-12" asChild>
            <Link href={`/barbershops?search=Pézinho`}>
              <FootprintsIcon />
              <p>Pezinho</p>
            </Link>
          </Button>
        </div>
        <div className="relative w-full h-[150px] mt-6">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {bookings.length > 0 && (
          <>
            <h2 className="text-zinc-400 text-md p-4">AGENDAMENTOS</h2>
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-2">
              {bookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-zinc-400 text-md p-4">RECOMENDADOS</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barbershop) => (
            <BarberShopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>

        <h2 className="text-zinc-400 text-md p-4">POPULARES</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((barbershop) => (
            <BarberShopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
