import { useState, useMemo } from "react";
import { HowToPlay } from "@/components/HowToPlay";
import { GameSetup, type GameMode } from "@/components/GameSetup";
import { PlayerReveal } from "@/components/PlayerReveal";
import { TeamReveal } from "@/components/TeamReveal";
import { PlayerCarousel } from "@/components/PlayerCarousel";
import { TeamCarousel } from "@/components/TeamCarousel";
import { MixedCarousel } from "@/components/MixedCarousel";
import { allPlayers, nbaPlayers, euroleaguePlayers, Player } from "@/data/players";
import { allTeams, nbaTeams, euroleagueTeams, Team } from "@/data/teams";
import { getRandomElement } from "@/lib/random";

type GameState = "setup" | "revealing" | "complete";
type MixedCategory =
  | { type: "nba-players"; data: Player[] }
  | { type: "euroleague-players"; data: Player[] }
  | { type: "nba-teams"; data: Team[] }
  | { type: "euroleague-teams"; data: Team[] };

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [totalPlayers, setTotalPlayers] = useState(4);
  const [assignedPlayer, setAssignedPlayer] = useState<Player | null>(null);
  const [assignedTeam, setAssignedTeam] = useState<Team | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>("Mix Players");

  const [impostorPositions, setImpostorPositions] = useState<number[]>([]);

  // Determine if mode uses players or teams
  const isPlayerMode = useMemo(() => {
    return gameMode === "NBA" || gameMode === "Euroleague" || gameMode === "Mix Players";
  }, [gameMode]);

  const isTeamMode = useMemo(() => {
    return gameMode === "NBA Teams" || gameMode === "Euroleague Teams" || gameMode === "Mix Teams";
  }, [gameMode]);

  // Filter players based on mode
  const availablePlayers = useMemo(() => {
    switch (gameMode) {
      case "NBA":
        return nbaPlayers;
      case "Euroleague":
        return euroleaguePlayers;
      case "Mix Players":
        return allPlayers;
      default:
        return [];
    }
  }, [gameMode]);

  // Filter teams based on mode
  const availableTeams = useMemo(() => {
    switch (gameMode) {
      case "NBA Teams":
        return nbaTeams;
      case "Euroleague Teams":
        return euroleagueTeams;
      case "Mix Teams":
        return allTeams;
      default:
        return [];
    }
  }, [gameMode]);

  // Combined items for Mix Everything mode
  const availableItems = useMemo(() => {
    if (gameMode === "Mix Everything") {
      return {
        players: allPlayers,
        teams: allTeams,
      };
    }
    return { players: [], teams: [] };
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
    
    // Select random item based on mode using cryptographically secure random
    if (mode === "NBA") {
      const randomPlayer = getRandomElement(nbaPlayers);
      if (randomPlayer) {
        setSelectedPlayer(randomPlayer);
        setSelectedTeam(null);
      }
    } else if (mode === "Euroleague") {
      const randomPlayer = getRandomElement(euroleaguePlayers);
      if (randomPlayer) {
        setSelectedPlayer(randomPlayer);
        setSelectedTeam(null);
      }
    } else if (mode === "Mix Players") {
      // First randomly choose a category (50% chance each)
      const playerCategories = [
        { type: 'nba-players', data: nbaPlayers },
        { type: 'euroleague-players', data: euroleaguePlayers }
      ];
      
      const availableCategories = playerCategories.filter(cat => cat.data.length > 0);
      
      if (availableCategories.length > 0) {
        const randomCategory = getRandomElement(availableCategories);
        if (randomCategory) {
          const randomPlayer = getRandomElement(randomCategory.data);
          if (randomPlayer) {
            setSelectedPlayer(randomPlayer);
            setSelectedTeam(null);
          }
        }
      }
    } else if (mode === "NBA Teams") {
      const randomTeam = getRandomElement(nbaTeams);
      if (randomTeam) {
        setSelectedTeam(randomTeam);
        setSelectedPlayer(null);
      }
    } else if (mode === "Euroleague Teams") {
      const randomTeam = getRandomElement(euroleagueTeams);
      if (randomTeam) {
        setSelectedTeam(randomTeam);
        setSelectedPlayer(null);
      }
    } else if (mode === "Mix Teams") {
      // First randomly choose a category (50% chance each)
      const teamCategories = [
        { type: 'nba-teams', data: nbaTeams },
        { type: 'euroleague-teams', data: euroleagueTeams }
      ];
      
      const availableCategories = teamCategories.filter(cat => cat.data.length > 0);
      
      if (availableCategories.length > 0) {
        const randomCategory = getRandomElement(availableCategories);
        if (randomCategory) {
          const randomTeam = getRandomElement(randomCategory.data);
          if (randomTeam) {
            setSelectedTeam(randomTeam);
            setSelectedPlayer(null);
          }
        }
      } else {
        // Fallback to players if no teams available
        const randomPlayer = getRandomElement(allPlayers);
        if (randomPlayer) {
          setSelectedPlayer(randomPlayer);
          setSelectedTeam(null);
        }
      }
    } else if (mode === "Mix Everything") {
      // First randomly choose a category (each has 25% chance)
      const categories: MixedCategory[] = [
        { type: 'nba-players', data: nbaPlayers },
        { type: 'nba-teams', data: nbaTeams },
        { type: 'euroleague-players', data: euroleaguePlayers },
        { type: 'euroleague-teams', data: euroleagueTeams }
      ];
      
      // Filter out empty categories
      const availableCategories = categories.filter(cat => cat.data.length > 0);
      
      if (availableCategories.length > 0) {
        // Randomly select a category (equal chance for each)
        const randomCategory = getRandomElement(availableCategories);
        
        if (randomCategory) {
          if (randomCategory.type === 'nba-players' || randomCategory.type === 'euroleague-players') {
            const randomPlayer = getRandomElement(randomCategory.data);
            if (randomPlayer) {
              setSelectedPlayer(randomPlayer);
              setSelectedTeam(null);
            }
          } else {
            const randomTeam = getRandomElement(randomCategory.data);
            if (randomTeam) {
              setSelectedTeam(randomTeam);
              setSelectedPlayer(null);
            }
          }
        }
      }
    }
    
    setGameState("revealing");
    setCurrentPlayer(1);
  };

  const handleContinue = () => {
    if (currentPlayer < totalPlayers) {
      setCurrentPlayer(currentPlayer + 1);
      setAssignedPlayer(null);
      setAssignedTeam(null);
    } else {
      // Automatically return to home screen when all players have seen their roles
      handleReset();
    }
  };

  const handleReset = () => {
    setGameState("setup");
    setCurrentPlayer(1);
    setAssignedPlayer(null);
    setAssignedTeam(null);
    setSelectedPlayer(null);
    setSelectedTeam(null);
    setImpostorPositions([]);
  };

  const isCurrentPlayerImpostor = impostorPositions.includes(currentPlayer);

  // Set the assigned player/team when revealing
  if (gameState === "revealing" && !assignedPlayer && !assignedTeam && !isCurrentPlayerImpostor) {
    if (selectedPlayer) {
      setAssignedPlayer(selectedPlayer);
    } else if (selectedTeam) {
      setAssignedTeam(selectedTeam);
    }
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
                {selectedPlayer || (gameMode === "Mix Everything" && assignedPlayer) ? (
                  <PlayerReveal
                    currentPlayer={currentPlayer}
                    totalPlayers={totalPlayers}
                    isImpostor={isCurrentPlayerImpostor}
                    assignedPlayer={isCurrentPlayerImpostor ? null : assignedPlayer}
                    onContinue={handleContinue}
                    onReset={handleReset}
                  />
                ) : (
                  <TeamReveal
                    currentPlayer={currentPlayer}
                    totalPlayers={totalPlayers}
                    isImpostor={isCurrentPlayerImpostor}
                    assignedTeam={isCurrentPlayerImpostor ? null : assignedTeam}
                    onContinue={handleContinue}
                    onReset={handleReset}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Player/Team Carousel - shown only in setup mode */}
      {gameState === "setup" && (
        <div className="w-full mt-auto">
          {isPlayerMode && availablePlayers.length > 0 && (
            <PlayerCarousel players={availablePlayers} />
          )}
          {isTeamMode && availableTeams.length > 0 && (
            <TeamCarousel teams={availableTeams} />
          )}
          {gameMode === "Mix Everything" && (
            <MixedCarousel 
              players={availableItems.players} 
              teams={availableItems.teams} 
            />
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="py-8">
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>Open-source basketball party game.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
