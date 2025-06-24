import { Card, CardContent } from "./ui/card";

export function Footer() {
  return (
    <footer>
      <Card className=" rounded-sm py-6 px-5">
        <CardContent className="">
          <p className="text-zinc-500">
            © 2025 Copyright{" "}
            <span className="font-semibold text-zinc-400">
              Chagas App Barber
            </span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}
