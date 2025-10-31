import { useState } from "react";
import { HowToPlay } from "@/components/HowToPlay";
import { GameSetup } from "@/components/GameSetup";
import { PlayerReveal } from "@/components/PlayerReveal";
import { PlayerGrid } from "@/components/PlayerGrid";
import { allPlayers, Player } from "@/data/players";

type GameState = "setup" | "revealing" | "complete";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [totalPlayers, setTotalPlayers] = useState(4);
  const [impostorPosition, setImpostorPosition] = useState<number>(0);
  const [assignedPlayer, setAssignedPlayer] = useState<Player | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleStartGame = (playerCount: number, impostorCount: number) => {
    setTotalPlayers(playerCount);
    setImpostorPosition(impostorCount > 0 ? Math.floor(Math.random() * playerCount) + 1 : -1);
    
    // Select a random player for this game
    const randomPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
    setSelectedPlayer(randomPlayer);
    
    setGameState("revealing");
    setCurrentPlayer(1);
  };

  const handleContinue = () => {
    if (currentPlayer < totalPlayers) {
      setCurrentPlayer(currentPlayer + 1);
      setAssignedPlayer(null);
    } else {
      setGameState("complete");
    }
  };

  const handleReset = () => {
    setGameState("setup");
    setCurrentPlayer(1);
    setAssignedPlayer(null);
    setSelectedPlayer(null);
  };

  const isCurrentPlayerImpostor = currentPlayer === impostorPosition;

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
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="space-y-8 w-full max-w-6xl">
          {/* Title */}
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              THE IMPOSTOR
            </h1>
            <p className="text-lg text-muted-foreground uppercase tracking-wider">
              Basketball • Version
            </p>
          </div>

          {/* Game Content */}
          <div className="flex justify-center">
            {gameState === "setup" && (
              <GameSetup onStartGame={handleStartGame} />
            )}

            {gameState === "revealing" && (
              <PlayerReveal
                currentPlayer={currentPlayer}
                totalPlayers={totalPlayers}
                isImpostor={isCurrentPlayerImpostor}
                assignedPlayer={isCurrentPlayerImpostor ? null : assignedPlayer}
                onContinue={handleContinue}
                onReset={handleReset}
              />
            )}

            {gameState === "complete" && selectedPlayer && (
              <div className="space-y-6 w-full animate-scale-in">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold">All players have seen their roles!</h2>
                  <p className="text-lg text-muted-foreground">
                    The real player for this game is: <span className="text-primary font-bold">{selectedPlayer.name}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Now discuss among yourselves and find the impostor!
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg glow-orange transition-all"
                  >
                    Start New Game
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer with Player Grid */}
      <footer className="py-8 space-y-6">
        <PlayerGrid players={allPlayers.slice(0, 20)} />
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>© 2025 The Impostor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
