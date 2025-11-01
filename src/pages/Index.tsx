import { useState, useMemo } from "react";
import { HowToPlay } from "@/components/HowToPlay";
import { GameSetup, type GameMode } from "@/components/GameSetup";
import { PlayerReveal } from "@/components/PlayerReveal";
import { PlayerCarousel } from "@/components/PlayerCarousel";
import { allPlayers, nbaPlayers, euroleaguePlayers, Player } from "@/data/players";

type GameState = "setup" | "revealing" | "complete";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [totalPlayers, setTotalPlayers] = useState(4);
  const [assignedPlayer, setAssignedPlayer] = useState<Player | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>("Mix");

  const [impostorPositions, setImpostorPositions] = useState<number[]>([]);

  // Filter players based on mode
  const availablePlayers = useMemo(() => {
    switch (gameMode) {
      case "NBA":
        return nbaPlayers;
      case "Euroleague":
        return euroleaguePlayers;
      case "Mix":
        return allPlayers;
      default:
        return allPlayers;
    }
  }, [gameMode]);

  const handleStartGame = (playerCount: number, impostorCount: number, mode: GameMode) => {
    setTotalPlayers(playerCount);
    setGameMode(mode);
    
    // Generate multiple random impostor positions
    const positions: number[] = [];
    if (impostorCount > 0) {
      const availablePositions = Array.from({ length: playerCount }, (_, i) => i + 1);
      for (let i = 0; i < impostorCount; i++) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        positions.push(availablePositions[randomIndex]);
        availablePositions.splice(randomIndex, 1);
      }
    }
    setImpostorPositions(positions);
    
    // Select a random player from available players based on mode
    const filteredPlayers = mode === "NBA" ? nbaPlayers : mode === "Euroleague" ? euroleaguePlayers : allPlayers;
    const randomPlayer = filteredPlayers[Math.floor(Math.random() * filteredPlayers.length)];
    setSelectedPlayer(randomPlayer);
    
    setGameState("revealing");
    setCurrentPlayer(1);
  };

  const handleContinue = () => {
    if (currentPlayer < totalPlayers) {
      setCurrentPlayer(currentPlayer + 1);
      setAssignedPlayer(null);
    } else {
      // Automatically return to home screen when all players have seen their roles
      handleReset();
    }
  };

  const handleReset = () => {
    setGameState("setup");
    setCurrentPlayer(1);
    setAssignedPlayer(null);
    setSelectedPlayer(null);
    setImpostorPositions([]);
  };

  const isCurrentPlayerImpostor = impostorPositions.includes(currentPlayer);

  // Set the assigned player when revealing
  if (gameState === "revealing" && !assignedPlayer && !isCurrentPlayerImpostor) {
    setAssignedPlayer(selectedPlayer);
  }

  return (
    <div className="min-h-screen diagonal-stripes flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <HowToPlay />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-4 pb-0">
        <div className="space-y-4 w-full max-w-6xl">
          {/* Title - hide when revealing */}
          {gameState !== "revealing" && (
            <div className="text-center space-y-2 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                THE IMPOSTOR
              </h1>
              <p className="text-lg text-muted-foreground uppercase tracking-wider">
                Basketball • Version
              </p>
            </div>
          )}

          {/* Game Content */}
          <div className="flex justify-center">
            {gameState === "setup" && (
              <GameSetup 
                onStartGame={handleStartGame}
                onModeChange={(mode) => setGameMode(mode)}
                currentMode={gameMode}
              />
            )}

            {gameState === "revealing" && (
              <div className="w-full flex justify-center">
                <PlayerReveal
                  currentPlayer={currentPlayer}
                  totalPlayers={totalPlayers}
                  isImpostor={isCurrentPlayerImpostor}
                  assignedPlayer={isCurrentPlayerImpostor ? null : assignedPlayer}
                  onContinue={handleContinue}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Player Carousel - shown only in setup mode */}
      {gameState === "setup" && (
        <div className="w-full mt-auto">
          <PlayerCarousel players={availablePlayers} />
        </div>
      )}

      {/* Footer */}
      <footer className="py-8">
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>© 2025 The Impostor. All rights reserved.</p>
          <p>project contributors</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
