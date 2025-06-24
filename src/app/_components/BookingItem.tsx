import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function BookingItem() {
  return (
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
  );
}
