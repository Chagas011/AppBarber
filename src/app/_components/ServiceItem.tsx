"use client";
import { Barbershop, BarbershopServices } from "@/generated/prisma";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { SheetBookingItem } from "./SheetBookingItem";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { SignDialog } from "./SignDialog";
import { useState } from "react";
import { useSession } from "next-auth/react";

type SafeService = Omit<BarbershopServices, "price"> & {
  price: number;
};

interface ServiceItemProps {
  service: SafeService;
  barbershop: Pick<Barbershop, "name">;
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession();
  const [signDialogIsOpen, setSignDialogIsOpen] = useState(false);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);
  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true);
    }

    return setSignDialogIsOpen(true);
  };

  const handleBookingSheetOpenChange = () => {
    setBookingSheetIsOpen(false);
  };
  return (
    <>
      <Card className="">
        <CardContent className="flex gap-3 p-3 items-center">
          <div className="relative min-h-[130px] min-w-[130px] max-h-[130px] max-w-[130px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover rounded-2xl"
            />
          </div>

          <div className="flex flex-col justify-between h-[130px] flex-1">
            <div>
              <h3 className="font-bold">{service.name}</h3>
              <p className="text-md text-zinc-400">{service.description}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="font-bold text-md text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button variant="secondary" onClick={handleBookingClick}>
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <div className="border-b-2 border-solid">
                      <SheetTitle className="p-5">Fazer reserva</SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="w-full px-5 py-2">
                    <SheetBookingItem
                      service={service}
                      barbershop={barbershop}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signDialogIsOpen}
        onOpenChange={(open) => setSignDialogIsOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Faça seu login</DialogTitle>
          <SignDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}
