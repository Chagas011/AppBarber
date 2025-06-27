"use client";

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
import { Dialog, DialogTrigger } from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { SignDialog } from "./SignDialog";

export function SidebarButton() {
  const { data } = useSession();

  const handleLogout = async () => {
    await signOut();
  };
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
            {!data?.user && (
              <>
                <h2 className="font-bold text-lg">Ola, faca seu login !</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <LogInIcon />
                    </Button>
                  </DialogTrigger>
                  <SignDialog />
                </Dialog>
              </>
            )}
            {data?.user && (
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  {<AvatarImage src={data?.user.image ?? ""} />}
                  <AvatarFallback>
                    {data.user.name
                      ?.split(" ")
                      .map((initial) => initial[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="items-center">
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-sm text-zinc-400">{data.user.email}</p>
                </div>
              </div>
            )}
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
            <SheetClose key={option.title} asChild>
              <Button className="justify-start" variant="ghost" asChild>
                <Link href={`/barbershops?search=${option.title}`}>
                  <Image
                    alt={option.title}
                    src={option.imageUrl}
                    width={20}
                    height={20}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        <div className="p-5">
          <Button variant="ghost" onClick={handleLogout}>
            <LogOutIcon />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
