import { useState, useEffect } from "react";
import { Minus, Plus, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export type GameMode = "NBA" | "Euroleague" | "Mix";

const GAME_MODE_STORAGE_KEY = "impostor-game-mode";
const PLAYER_COUNT_STORAGE_KEY = "impostor-player-count";
const IMPOSTOR_COUNT_STORAGE_KEY = "impostor-impostor-count";

interface GameSetupProps {
  onStartGame: (playerCount: number, impostorCount: number, mode: GameMode) => void;
  onModeChange?: (mode: GameMode) => void;
  currentMode?: GameMode;
}

export const GameSetup = ({ onStartGame, onModeChange, currentMode }: GameSetupProps) => {
  const [playerCount, setPlayerCount] = useState(() => {
    // Load saved player count from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(PLAYER_COUNT_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 4 && parsed <= 15) {
          return parsed;
        }
      }
    }
    return 4;
  });
  
  const [impostorCount, setImpostorCount] = useState(() => {
    // Load saved impostor count from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(IMPOSTOR_COUNT_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 0) {
          return parsed;
        }
      }
    }
    return 1;
  });
  
  const [mode, setMode] = useState<GameMode>(() => {
    // Use currentMode from parent if provided, otherwise load from localStorage
    if (currentMode) {
      return currentMode;
    }
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(GAME_MODE_STORAGE_KEY);
      if (saved === "NBA" || saved === "Euroleague" || saved === "Mix") {
        return saved;
      }
    }
    return "Mix";
  });

  // Update mode when currentMode prop changes
  useEffect(() => {
    if (currentMode && currentMode !== mode) {
      setMode(currentMode);
    }
  }, [currentMode, mode]);

  const maxImpostors = Math.floor(playerCount / 2);

  // Validate impostor count when player count changes
  useEffect(() => {
    if (impostorCount > maxImpostors) {
      setImpostorCount(maxImpostors);
    }
  }, [playerCount, maxImpostors]);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(GAME_MODE_STORAGE_KEY, mode);
      localStorage.setItem(PLAYER_COUNT_STORAGE_KEY, playerCount.toString());
      localStorage.setItem(IMPOSTOR_COUNT_STORAGE_KEY, impostorCount.toString());
    }
  }, [mode, playerCount, impostorCount]);

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
              onClick={() => {
                setMode("NBA");
                onModeChange?.("NBA");
              }}
              className="w-full"
            >
              NBA
            </Button>
            <Button
              variant={mode === "Euroleague" ? "default" : "outline"}
              onClick={() => {
                setMode("Euroleague");
                onModeChange?.("Euroleague");
              }}
              className="w-full"
            >
              Euroleague
            </Button>
            <Button
              variant={mode === "Mix" ? "default" : "outline"}
              onClick={() => {
                setMode("Mix");
                onModeChange?.("Mix");
              }}
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
