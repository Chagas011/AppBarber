"use client";
import { useEffect, useState } from "react";
import { SignDialog } from "./SignDialog";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Header from "./Header";

interface DialogOpenProps {
  state: boolean;
}

export function DialogOpen({ state }: DialogOpenProps) {
  const [signDialogIsOpen, setSignDialogIsOpen] = useState(false);

  useEffect(() => {
    setSignDialogIsOpen(state);
  }, [state]);

  return (
    <>
      <Header />
      <Dialog
        open={signDialogIsOpen}
        onOpenChange={(open) => setSignDialogIsOpen(open)}
      >
        <DialogContent>
          <DialogTitle>Faça seu login</DialogTitle>
          <SignDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}
