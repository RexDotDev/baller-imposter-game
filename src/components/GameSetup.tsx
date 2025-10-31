import { useState } from "react";
import { Minus, Plus, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type GameMode = "NBA" | "Euroleague" | "Mix";

interface GameSetupProps {
  onStartGame: (playerCount: number, impostorCount: number, mode: GameMode) => void;
}

export const GameSetup = ({ onStartGame }: GameSetupProps) => {
  const [playerCount, setPlayerCount] = useState(4);
  const [impostorCount, setImpostorCount] = useState(1);
  const [mode, setMode] = useState<GameMode>("Mix");

  const maxImpostors = Math.floor(playerCount / 2);

  const incrementPlayers = () => {
    if (playerCount < 15) {
      setPlayerCount(playerCount + 1);
      // Adjust impostor count if it exceeds new maximum
      const newMax = Math.floor((playerCount + 1) / 2);
      if (impostorCount > newMax) {
        setImpostorCount(newMax);
      }
    }
  };

  const decrementPlayers = () => {
    if (playerCount > 4) {
      setPlayerCount(playerCount - 1);
      // Adjust impostor count if it exceeds new maximum
      const newMax = Math.floor((playerCount - 1) / 2);
      if (impostorCount > newMax) {
        setImpostorCount(newMax);
      }
    }
  };

  const incrementImpostors = () => {
    if (impostorCount < maxImpostors) setImpostorCount(impostorCount + 1);
  };

  const decrementImpostors = () => {
    if (impostorCount > 0) setImpostorCount(impostorCount - 1);
  };

  return (
    <Card className="p-8 max-w-2xl w-full bg-card/80 backdrop-blur border-game-border animate-scale-in">
      <div className="space-y-6">
        <p className="text-muted-foreground text-center">
          The AI automatically chooses a famous basketball player for this match.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Amount of players <span className="text-muted-foreground">(4 to 15)</span>
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                onClick={decrementPlayers}
                disabled={playerCount <= 4}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={playerCount}
                  readOnly
                  className="w-full bg-secondary text-center text-2xl font-bold py-2 rounded-lg"
                />
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={incrementPlayers}
                disabled={playerCount >= 15}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">
              Amount of impostors <span className="text-muted-foreground">(max. {maxImpostors})</span>
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="icon"
                onClick={decrementImpostors}
                disabled={impostorCount <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={impostorCount}
                  readOnly
                  className="w-full bg-secondary text-center text-2xl font-bold py-2 rounded-lg"
                />
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={incrementImpostors}
                disabled={impostorCount >= maxImpostors}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Game Mode</label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={mode === "NBA" ? "default" : "outline"}
              onClick={() => setMode("NBA")}
              className="w-full"
            >
              NBA
            </Button>
            <Button
              variant={mode === "Euroleague" ? "default" : "outline"}
              onClick={() => setMode("Euroleague")}
              className="w-full"
            >
              Euroleague
            </Button>
            <Button
              variant={mode === "Mix" ? "default" : "outline"}
              onClick={() => setMode("Mix")}
              className="w-full"
            >
              Mix
            </Button>
          </div>
        </div>

        <Button
          onClick={() => onStartGame(playerCount, impostorCount, mode)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 gap-2 glow-orange"
          size="lg"
        >
          <Gamepad2 className="h-5 w-5" />
          Start the game
        </Button>
      </div>
    </Card>
  );
};
