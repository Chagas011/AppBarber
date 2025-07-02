"use client";
import { Prisma } from "@/generated/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteBooking } from "../_actions/deleteBooking";
import { useState } from "react";

interface IBookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true };
      };
    };
  }>;
}

export function BookingItem({ booking }: IBookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleDeleteBooking = async () => {
    try {
      await deleteBooking(booking.id);
      setIsSheetOpen(false);
      // adicionar toast.
    } catch (error) {
      console.log(error);
    }
  };

  const handleSheetChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };
  const isConfirmed = isFuture(booking.date);
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 pl-5">
              <Badge
                className={`w-fit `}
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex gap-2 items-center">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                  <AvatarFallback>VB</AvatarFallback>
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-4 border-solid px-5">
              <p className="text-xl capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-4xl font-semibold">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-md">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-3 w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left border-b-2 border-solid p-3">
            {" "}
            Informações da reserva
          </SheetTitle>
        </SheetHeader>
        <div className="relative h-[180px] w-full flex items-end">
          <Image
            src="/map.png"
            alt="mapa"
            fill
            className="object-cover rounded-xl"
          />
          <Card className="z-50 w-full mb-3 mx-5 p-0">
            <CardContent className="px-5 py-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-bold">
                  {booking.service.barbershop.name}{" "}
                </h3>
                <p className="text-sm text-zinc-400">
                  {booking.service.barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-2 py-3">
          <Badge
            className={`w-fit `}
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="p-0 mt-5">
            <CardContent className="p-3 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>

                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">Data</p>
                <p>{format(booking.date, "d 'de' MMMM", { locale: ptBR })}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">Horario</p>
                <p>{format(booking.date, "HH:mm", { locale: ptBR })}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">Barbearia</p>
                <p>{booking.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="">
          <h3 className="text-md uppercase text-zinc-400 mb-3">Contatos</h3>
          {booking.service.barbershop.phones.map((phone) => (
            <div className="flex justify-between space-y-3 p-2" key={phone}>
              <div className="flex gap-2 items-center">
                <SmartphoneIcon />
                <p>{phone}</p>
              </div>

              <Button>Ligar</Button>
            </div>
          ))}
        </div>

        <SheetFooter className="mt-1">
          <div className="flex gap-3 items-center justify-center">
            <SheetClose asChild>
              <Button variant="secondary" className="w-[150px]">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-[150px]">
                    Cancelar Reserva
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Deseja realmente cancelar a reserva ?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <div className="flex flex-col w-full px-4 gap-3 mt-5">
                      <AlertDialogAction
                        className="bg-destructive"
                        onClick={handleDeleteBooking}
                      >
                        Confirmar
                      </AlertDialogAction>
                      <AlertDialogCancel className="">
                        Cancelar
                      </AlertDialogCancel>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
