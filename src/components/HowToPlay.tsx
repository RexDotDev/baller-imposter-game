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
              <p className="mt-1">
                Choose a player or team mode, then pass one device around the group.
              </p>
            </div>
            
            <div>
              <strong className="text-foreground">Game Rules:</strong>
              <ul className="mt-1 space-y-1 list-disc list-inside">
                <li>Select 4 to 15 players</li>
                <li>Choose one or more impostors, who must remain a minority</li>
                <li>Each player privately reveals their role, then hides it before passing the device</li>
              </ul>
            </div>
            
            <div>
              <strong className="text-foreground">Objective:</strong>
              <p className="mt-1">
                Everyone except the impostor sees the same basketball player or team.
                Give clues, listen carefully, and vote out the impostor without revealing
                the answer too quickly.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
