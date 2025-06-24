import { FootprintsIcon, PaintbrushIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { quickSearchOptions } from "../quickSearchList";
import Image from "next/image";

export function QuickSearch() {
  return (
    <>
      <div className="flex flex-row mt-6 items-center gap-2">
        <Input placeholder="Faça sua busca" className="h-12" />
        <Button size="lg">
          <SearchIcon />
        </Button>
      </div>

      <div className="flex items-center gap-5 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button
            size="lg"
            variant="outline"
            className="w-32 h-12"
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
        <Button size="lg" variant="outline" className="w-32 h-12">
          <FootprintsIcon />
          <p>Pezinho</p>
        </Button>

        <Button size="lg" variant="outline" className="w-32 h-12">
          <PaintbrushIcon />
          <p>Escova</p>
        </Button>
      </div>
    </>
  );
}
