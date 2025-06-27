export function gerarHorarios(inicio = 8, fim = 23, intervalo = 30): string[] {
  const horarios: string[] = [];

  for (let h = inicio; h <= fim; h++) {
    for (let m = 0; m < 60; m += intervalo) {
      if (h === fim && m > 0) break; // evita passar do horário final
      const hora = String(h).padStart(2, "0");
      const minuto = String(m).padStart(2, "0");
      horarios.push(`${hora}:${minuto}`);
    }
  }

  return horarios;
}
