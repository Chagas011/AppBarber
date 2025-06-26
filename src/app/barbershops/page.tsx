import BarberShopItem from "../_components/BarberShopItem";
import Header from "../_components/Header";
import { QuickSearch } from "../_components/QuickSearch";
import { db } from "../_lib/prisma";

interface BarberShopPageProps {
  searchParams: {
    search?: string;
  };
}
export default async function BarberShopPage({
  searchParams,
}: BarberShopPageProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: searchParams.search,
            mode: "insensitive",
          },
        },

        {
          services: {
            some: {
              name: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  });
  return (
    <div className="">
      <Header />
      <div className="my-6 px-5">
        <QuickSearch />
      </div>
      <div className="p-5">
        <h2 className="text-zinc-400 text-md p-4">
          Resultados para &quot;{searchParams.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
