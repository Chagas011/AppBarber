import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <Card>
      <CardContent className="justify-between items-center flex flex-row">
        <Image src="/logo.png" height={18} width={120} alt="fsw Barber" />
        <DropdownMenu>
          <DropdownMenuTrigger
            className="cursor-pointer transition-all ease-in-out duration-500"
            asChild
          >
            <MenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex gap-2 items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png" />
                  <AvatarFallback>VB</AvatarFallback>
                </Avatar>
                chagas@example.com
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
