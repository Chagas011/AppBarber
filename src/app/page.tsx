import Header from "./_components/Header";

import Image from "next/image";

import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";
import { QuickSearch } from "./_components/QuickSearch";
import { Footer } from "./_components/Footer";
import { BookingItem } from "./_components/BookingItem";

export default async function App() {
  const barberShops = await db.barbershop.findMany();
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Chagas</h2>
        <p>Segunda-feira, 23 de Junho</p>

        <QuickSearch />

        <div className="relative w-full h-[150px] mt-6">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <h2 className="text-zinc-400 text-md p-4">AGENDAMENTOS</h2>
        <BookingItem />

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
      <Footer />
    </div>
  );
}
