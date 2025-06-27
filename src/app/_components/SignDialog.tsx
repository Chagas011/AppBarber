import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function SignDialog() {
  const handleLoginWithGoogle = async () => {
    await signIn("google");
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center">
          Faça login na Plataforma
        </DialogTitle>
        <DialogDescription className="text-center">
          Conecte-se usando sua conta do Google
        </DialogDescription>
      </DialogHeader>

      <Button className="" variant="outline" onClick={handleLoginWithGoogle}>
        <p className="flex gap-1 items-center">
          <span className="font-bold text-lg">G</span>
          Google
        </p>
      </Button>
    </DialogContent>
  );
}
