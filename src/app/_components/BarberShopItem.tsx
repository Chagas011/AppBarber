import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Barbershop } from "@/generated/prisma";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarberShopItemProps {
  barbershop: Barbershop;
}
export default function BarberShopItem({ barbershop }: BarberShopItemProps) {
  return (
    <div>
      <Card className="min-w-[167px] p-0">
        <CardContent className="p-0">
          <div className="relative h-[159px] w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="object-cover rounded-xl"
            />

            <Badge
              className="absolute top-2 left-2 space-x-1"
              variant="secondary"
            >
              <StarIcon className="fill-primary text-primary" />
              <p>5,0</p>
            </Badge>
          </div>

          <div className="flex flex-col px-2 py-3">
            <h3 className="font-semibold truncate">{barbershop.name}</h3>
            <p className="text-sm text-zinc-400 truncate">
              {barbershop.address}
            </p>

            <Button className="mt-3 w-full">Reservar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
