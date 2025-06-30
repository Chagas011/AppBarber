"use client";

import { ptBR } from "date-fns/locale";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { gerarHorarios } from "../timeList";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Barbershop, BarbershopServices, Booking } from "@/generated/prisma";
import { format, set } from "date-fns";
import { SheetClose, SheetFooter } from "./ui/sheet";
import { createBooking } from "../_actions/createBooking";

import { getBookings } from "../_actions/getBookings";

type SerializableService = Omit<BarbershopServices, "price"> & {
  price: number;
};

interface SheetBookingItemProps {
  service: SerializableService;
  barbershop: Pick<Barbershop, "name">;
}
const generateDayTimeList = gerarHorarios();

const getTimeList = (bookings: Booking[]) => {
  const timeList = generateDayTimeList.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const hasBookingCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes
    );
    if (hasBookingCurrentTime) {
      return false;
    }
    return true;
  });

  return timeList;
};

export function SheetBookingItem({
  service,
  barbershop,
}: SheetBookingItemProps) {
  const [selectDay, setSelectDay] = useState<Date | undefined>(undefined);
  const [selectTime, setSelectTime] = useState<string | undefined>(undefined);
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!selectDay) return;
      const bookings = await getBookings({
        date: selectDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectDay, service.id]);

  const handleSelectDay = (date: Date | undefined) => {
    setSelectDay(date);
  };

  const handleSelectTime = (time: string) => {
    setSelectTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectDay || !selectTime) return;
      const hour = selectTime.split(":")[0];
      const minutes = selectTime.split(":")[1];

      const newDate = set(selectDay, {
        minutes: Number(minutes),
        hours: Number(hour),
      });

      await createBooking({
        serviceId: service.id,

        date: newDate,
      });
      console.log("Reserva criado com sucesso");
    } catch (e) {
      console.log(e);
    }
  };
  console.log(selectTime);
  return (
    <>
      <div className="border-b-2 border-solid">
        <Calendar
          disabled={{ before: new Date() }}
          selected={selectDay}
          onSelect={handleSelectDay}
          mode="single"
          locale={ptBR}
          className="w-full"
          classNames={{
            table: "w-full", // garante que a tabela ocupe toda a largura
            head_cell: "w-full",
            cell: "w-full",
            caption: "capitalize",
          }}
        />
      </div>

      {selectDay && (
        <div
          className="px-5 grid grid-cols-5 gap-1 mt-5 pb-3 overflow-y-auto max-h-[168px] 
             [&::-webkit-scrollbar]:hidden scrollbar-hide border-b-2 border-solid"
        >
          {getTimeList(dayBookings).map((time) => (
            <Button
              key={time}
              className="rounded-full"
              variant={selectTime === time ? "default" : "outline"}
              onClick={() => handleSelectTime(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      )}

      {selectTime && selectDay && (
        <div className="p-5 mt-3">
          <Card className="p-0">
            <CardContent className="p-3 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{service.name}</h2>

                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">Data</p>
                <p>{format(selectDay, "d 'de' MMMM", { locale: ptBR })}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">Horario</p>
                <p>{selectTime}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-400">Barbearia</p>
                <p>{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <SheetFooter className="px-5">
        <SheetClose asChild>
          <Button
            variant={selectDay && selectTime ? "default" : "secondary"}
            onClick={handleCreateBooking}
            disabled={!selectDay || !selectTime}
          >
            Confirmar
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}
