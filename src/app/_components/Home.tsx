"use client";

import { useSession } from "next-auth/react";

export function Home() {
  const { data } = useSession();
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long", // dia da semana
    day: "numeric", // dia do mês
    month: "long", // nome do mês
  });
  return (
    <>
      <h2 className="text-xl font-bold">
        {!data ? "Faça seu login" : data.user?.name}
      </h2>
      <p className="text-sm font-extralight text-zinc-300">
        {dataAtual.toLocaleUpperCase()}
      </p>
    </>
  );
}
