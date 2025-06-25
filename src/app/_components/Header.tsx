import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import { SidebarButton } from "./SidebarButton";

export default function Header() {
  return (
    <Card>
      <CardContent className="justify-between items-center flex flex-row">
        <Image src="/logo.png" height={18} width={120} alt="fsw Barber" />

        <SidebarButton />
      </CardContent>
    </Card>
  );
}
