import {
  CalendarDaysIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { quickSearchOptions } from "../quickSearchList";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function SidebarButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <div className="flex gap-2 items-center p-3 border-b-2 border-solid justify-between">
            <h2 className="font-bold text-lg">Ola, faca seu login !</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Faça login na Plataforma
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>

                <Button className="" variant="outline">
                  <p className="flex gap-1 items-center">
                    <span className="font-bold text-lg">G</span>
                    Google
                  </p>
                </Button>
              </DialogContent>
            </Dialog>
            {/*<Avatar className="h-14 w-14">
              <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />
              <AvatarFallback>VB</AvatarFallback>
            </Avatar>
            <div className="items-center">
              <p className="font-bold">Chagas User</p>
              <p className="text-sm text-zinc-400">chagas@example.com</p>
            </div> */}
          </div>
        </SheetHeader>

        <div className="p-5 flex flex-col space-y-3 border-b-2 border-solid">
          <SheetClose asChild>
            <Button className="justify-start" asChild>
              <Link href="/">
                <HomeIcon className="text-white fill" />
                Inicio
              </Link>
            </Button>
          </SheetClose>
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
  );
}
