import { SearchIcon } from "lucide-react";
import Header from "./_components/Header";
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarberShopItem from "./_components/BarberShopItem";

export default async function App() {
  const barberShops = await db.barbershop.findMany();
  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Chagas</h2>
        <p>Segunda-feira, 23 de Junho</p>

        {/* BUSCA */}
        <div className="flex flex-row mt-6 items-center gap-2">
          <Input placeholder="Faça sua busca" className="h-12" />
          <Button size="lg">
            <SearchIcon />
          </Button>
        </div>

        {/* ICONS SERVICES */}
        <div className="flex items-center gap-5 justify-center mt-6">
          <Button size="lg" variant="outline" className="w-32 h-12">
            <Image alt="CabeloIcon" src="/cabelo.svg" width={20} height={20} />
            <p>Cabelo</p>
          </Button>
          <Button size="lg" variant="outline" className="w-32 h-12">
            <Image alt="BarbaIcon" src="/barba.svg" width={20} height={20} />
            <p>Barba</p>
          </Button>
          <Button size="lg" variant="outline" className="w-32 h-12">
            <Image
              alt="MassagemIcon"
              src="/massagem.svg"
              width={20}
              height={20}
            />
            <p>Massagem</p>
          </Button>
          <Button size="lg" variant="outline" className="w-32 h-12">
            <Image
              alt="SobrancelhaIcon"
              src="/sobrancelha.svg"
              width={20}
              height={20}
            />
            <p>Sobrancelha</p>
          </Button>
        </div>

        {/* BANNER */}
        <div className="relative w-full h-[150px] mt-6">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* AGENDAMENTOS  */}
        <h2 className="text-zinc-400 text-md p-4">AGENDAMENTOS</h2>

        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex gap-2 items-center">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />
                  <AvatarFallback>VB</AvatarFallback>
                </Avatar>
                <p className="text-sm">Vintage Barber</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-4 border-solid px-5">
              <p className="text-xl">Junho</p>
              <p className="text-4xl font-semibold">23</p>
              <p className="text-xl">08:45</p>
            </div>
          </CardContent>
        </Card>

        {/* RECOMENDADOS */}

        <h2 className="text-zinc-400 text-md p-4">RECOMENDADOS</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barbershop) => (
            <BarberShopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
