import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { Player } from "@/data/players";

interface PlayerRevealProps {
  currentPlayer: number;
  totalPlayers: number;
  isImpostor: boolean;
  assignedPlayer: Player | null;
  onContinue: () => void;
  onReset: () => void;
}

export const PlayerReveal = ({
  currentPlayer,
  totalPlayers,
  isImpostor,
  assignedPlayer,
  onContinue,
  onReset,
}: PlayerRevealProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card className="p-8 max-w-md w-full bg-card/80 backdrop-blur border-game-border animate-scale-in">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Player {currentPlayer}/{totalPlayers}
        </h2>

        {!revealed ? (
          <Button
            onClick={() => setRevealed(true)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-8 gap-2 glow-orange"
            size="lg"
          >
            <Eye className="h-5 w-5" />
            Look at your role
          </Button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {isImpostor ? (
              <div className="text-center space-y-4 p-6 bg-destructive/20 rounded-lg border-2 border-destructive">
                <EyeOff className="h-16 w-16 mx-auto text-destructive" />
                <h3 className="text-2xl font-bold text-destructive">You are the IMPOSTOR!</h3>
                <p className="text-muted-foreground">
                  Try to blend in and figure out who the real player is!
                </p>
              </div>
            ) : assignedPlayer ? (
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold">{assignedPlayer.name}</h3>
                  <p className="text-xl text-muted-foreground">{assignedPlayer.team}</p>
                  <p className="text-lg text-primary font-semibold">{assignedPlayer.league}</p>
                </div>
              </div>
            ) : null}

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setRevealed(false);
                  onContinue();
                }}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="lg"
              >
                Continue
              </Button>
              <Button onClick={onReset} variant="secondary" size="lg">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
