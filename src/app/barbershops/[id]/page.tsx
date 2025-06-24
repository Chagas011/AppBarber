import { ServiceItem } from "@/app/_components/ServiceItem";
import { Button } from "@/app/_components/ui/button";

import { db } from "@/app/_lib/prisma";
import {
  ChevronLeft,
  MapPinIcon,
  MenuIcon,
  SmartphoneIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
interface BarberShopProps {
  params: {
    id: string;
  };
}

export default async function BarberShop({ params }: BarberShopProps) {
  const barberShop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barberShop) {
    return notFound();
  }
  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          src={barberShop.imageUrl}
          alt={barberShop.name}
          fill
          className="object-cover rounded-xl"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeft width={30} height={30} />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
        >
          <MenuIcon width={30} height={30} />
        </Button>
      </div>
      <div className="p-5 border-b-2 border-solid">
        <h1 className="text-2xl font-bold">{barberShop.name}</h1>

        <div className="flex items-center gap-2 mt-3">
          <p className="flex gap-2">
            <MapPinIcon className="text-primary" />
            {barberShop.address}, São Paulo
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex mt-3 gap-2">
            <StarIcon className="fill-primary text-primary" />
            <p>5,0 (8850 Avaliações)</p>
          </div>
        </div>
      </div>

      <div className="p-5 border-b-2 border-solid space-y-2">
        <h3 className="text-md text-zinc-400 uppercase">Sobre nós</h3>
        <p className="text-sm text-zinc-300 text-justify">
          {barberShop.description}
        </p>
      </div>

      <div className="p-5 border-b-2 border-solid">
        <h3 className="text-md uppercase text-zinc-400">Serviços</h3>

        <div className="mt-4 space-y-3 ">
          {barberShop.services.map((service) => (
            <ServiceItem service={service} key={service.id} />
          ))}
        </div>
      </div>

      <div className="p-5 ">
        <h3 className="text-md uppercase text-zinc-400 mb-3">Contatos</h3>
        {barberShop.phones.map((phone) => (
          <div className="flex justify-between space-y-3 p-2" key={phone}>
            <div className="flex gap-2 items-center">
              <SmartphoneIcon />
              <p>{phone}</p>
            </div>

            <Button>Ligar</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
