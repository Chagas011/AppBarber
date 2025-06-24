import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import { CalendarDaysIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { quickSearchOptions } from "../quickSearchList";

export default function Header() {
  return (
    <Card>
      <CardContent className="justify-between items-center flex flex-row">
        <Image src="/logo.png" height={18} width={120} alt="fsw Barber" />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="flex gap-2 items-center p-3 border-b-2 border-solid">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />
                  <AvatarFallback>VB</AvatarFallback>
                </Avatar>
                <div className=" items-center">
                  <p className="font-bold">Chagas User</p>
                  <p className="text-sm text-zinc-400">chagas@example.com</p>
                </div>
              </div>
            </SheetHeader>

            <div className="p-5 flex flex-col space-y-3 border-b-2 border-solid">
              <Button className="justify-start">
                <HomeIcon className="text-white fill" />
                Inicio
              </Button>
              <Button className="justify-start" variant="ghost">
                <CalendarDaysIcon />
                Agendamentos
              </Button>
            </div>

            <div className="p-5 flex flex-col space-y-5 border-b-2 border-solid">
              {quickSearchOptions.map((option) => (
                <Button
                  className="justify-start"
                  variant="ghost"
                  key={option.title}
                >
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    width={20}
                    height={20}
                  />
                  <p>{option.title}</p>
                </Button>
              ))}
            </div>

            <div className="p-5">
              <Button variant="ghost">
                <LogOutIcon />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
