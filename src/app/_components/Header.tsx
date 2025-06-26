import Image from "next/image";
import { Card, CardContent } from "./ui/card";

import { SidebarButton } from "./SidebarButton";
import Link from "next/link";

export default function Header() {
  return (
    <Card>
      <CardContent className="justify-between items-center flex flex-row">
        <Link href="/">
          <Image src="/logo.png" height={18} width={120} alt="fsw Barber" />
        </Link>

        <SidebarButton />
      </CardContent>
    </Card>
  );
}
