import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, ShieldAlert } from "lucide-react";
import { Team } from "@/data/teams";
import { IdentityBadge } from "@/components/IdentityBadge";

interface TeamRevealProps {
  currentPlayer: number;
  totalPlayers: number;
  isImpostor: boolean;
  assignedTeam: Team | null;
  onContinue: () => void;
  onReset: () => void;
}

export const TeamReveal = ({ currentPlayer, totalPlayers, isImpostor, assignedTeam, onContinue, onReset }: TeamRevealProps) => {
  const [revealed, setRevealed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setIsTransitioning(false);
  }, [currentPlayer]);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(onContinue, 150);
  };

  return (
    <Card className="p-3 sm:p-6 md:p-8 max-w-2xl w-full bg-card/80 backdrop-blur border-game-border animate-scale-in">
      <div className="space-y-2 sm:space-y-4 md:space-y-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center">Player {currentPlayer}/{totalPlayers}</h2>
        {!revealed ? (
          <div className="text-center space-y-4 sm:space-y-6 min-h-[400px] flex flex-col items-center justify-center">
            <p className="text-lg sm:text-xl text-muted-foreground">Get ready to see your role</p>
            <Button onClick={() => setRevealed(true)} className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 px-8 glow-orange" size="lg">Look at your role</Button>
          </div>
        ) : (
          <div className={`space-y-4 sm:space-y-6 ${isTransitioning ? "fade-out" : "fade-in"}`}>
            {isImpostor ? (
              <div className="text-center flex flex-col items-center justify-center min-h-[260px] sm:min-h-[400px] space-y-6">
                <ShieldAlert className="h-28 w-28 text-destructive drop-shadow-lg" aria-hidden="true" />
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-destructive impostor-glow">IMPOSTOR</h3>
              </div>
            ) : assignedTeam ? (
              <div className="text-center space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{assignedTeam.name}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-primary font-semibold">{assignedTeam.league}</p>
                </div>
                <IdentityBadge name={assignedTeam.name} subtitle={`Team · ${assignedTeam.league}`} className="mx-auto h-56 w-full max-w-sm" />
              </div>
            ) : null}
            <div className="flex gap-2 sm:gap-3">
              <Button onClick={handleContinue} className="flex-1 bg-primary hover:bg-primary/90 text-sm sm:text-base" size="default" disabled={isTransitioning}>Continue</Button>
              <Button onClick={onReset} variant="secondary" size="default" aria-label="Reset game"><RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" /></Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
