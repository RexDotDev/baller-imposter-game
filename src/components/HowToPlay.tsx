import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const HowToPlay = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="gap-2">
          <Info className="h-4 w-4" />
          How to play
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">How to Play</DialogTitle>
          <DialogDescription className="space-y-4 pt-4 text-base">
            <div>
              <strong className="text-foreground">Setup:</strong>
              <p className="mt-1">The AI automatically chooses a famous basketball player for this match.</p>
            </div>
            
            <div>
              <strong className="text-foreground">Game Rules:</strong>
              <ul className="mt-1 space-y-1 list-disc list-inside">
                <li>Select the number of players (4 to 15)</li>
                <li>Set the number of impostors (maximum 1)</li>
                <li>Each player will see either a famous basketball player or be designated as the impostor</li>
              </ul>
            </div>
            
            <div>
              <strong className="text-foreground">Objective:</strong>
              <p className="mt-1">The impostor doesn't know who the real player is. Players must discuss and figure out who the impostor is among them!</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
