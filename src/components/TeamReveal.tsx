import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Loader2 } from "lucide-react";
import { Team } from "@/data/teams";

interface TeamRevealProps {
  currentPlayer: number;
  totalPlayers: number;
  isImpostor: boolean;
  assignedTeam: Team | null;
  onContinue: () => void;
  onReset: () => void;
}

export const TeamReveal = ({
  currentPlayer,
  totalPlayers,
  isImpostor,
  assignedTeam,
  onContinue,
  onReset,
}: TeamRevealProps) => {
  const [revealed, setRevealed] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRevealed(false);
    setIsTransitioning(false);
  }, [currentPlayer]);

  useEffect(() => {
    if (assignedTeam && revealed) {
      setImageLoading(true);
      setImageError(false);
      
      // Preload team logo
      const img = new Image();
      img.src = assignedTeam.logoUrl;
      img.loading = 'eager';
      
      const timeoutId = setTimeout(() => {
        setImageLoading(false);
      }, 5000);
      
      img.onload = () => {
        clearTimeout(timeoutId);
        setImageLoading(false);
        setImageError(false);
      };
      
      img.onerror = () => {
        clearTimeout(timeoutId);
        setImageLoading(false);
        setImageError(true);
      };
      
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [assignedTeam, revealed, currentPlayer]);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 150);
  };

  return (
    <Card className="p-3 sm:p-6 md:p-8 max-w-2xl w-full bg-card/80 backdrop-blur border-game-border animate-scale-in">
      <div className="space-y-2 sm:space-y-4 md:space-y-6">
        {!revealed ? (
          <>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
              Player {currentPlayer}/{totalPlayers}
            </h2>
            <div className="text-center space-y-4 sm:space-y-6 min-h-[400px] flex flex-col items-center justify-center">
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Get ready to see your role
                </p>
                <Button
                  onClick={() => setRevealed(true)}
                  className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 px-8 glow-orange"
                  size="lg"
                >
                  Look at your role
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
              Player {currentPlayer}/{totalPlayers}
            </h2>
            <div 
              ref={contentRef}
              className={`space-y-3 sm:space-y-4 md:space-y-6 ${isTransitioning ? 'fade-out' : 'fade-in'}`}
            >
              {isImpostor ? (
                <div className="text-center flex flex-col items-center justify-center min-h-[180px] sm:min-h-[250px] md:min-h-[400px] space-y-4">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-destructive impostor-glow">
                    IMPOSTOR
                  </h3>
                  <div className="flex justify-center mt-4 pr-12">
                    <img 
                      src="/Imposter.png" 
                      alt="Imposter" 
                      className="max-w-xs md:max-w-sm h-auto"
                    />
                  </div>
                </div>
              ) : assignedTeam ? (
                <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{assignedTeam.name}</h3>
                    <p className="text-sm sm:text-base md:text-lg text-primary font-semibold">{assignedTeam.league}</p>
                  </div>
                  
                  {/* Team Logo */}
                  <div className="mt-2 sm:mt-4 md:mt-6 w-full px-2">
                    <div className="flex items-center justify-center p-1 sm:p-2 relative min-h-[180px] sm:min-h-[250px] md:min-h-[400px]">
                      {imageLoading && !imageError && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                        </div>
                      )}
                      <img
                        src={assignedTeam.logoUrl}
                        alt={assignedTeam.name}
                        className={`w-auto h-auto max-w-full rounded-lg object-contain shadow-lg transition-opacity duration-300 ${
                          imageLoading ? "opacity-0" : "opacity-100"
                        }`}
                        style={{ 
                          display: 'block',
                          maxHeight: 'min(calc(100vh - 300px), 250px)',
                          imageRendering: 'optimizeQuality'
                        }}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        onLoad={() => {
                          setImageLoading(false);
                          setImageError(false);
                        }}
                        onError={() => {
                          setImageLoading(false);
                          setImageError(true);
                        }}
                      />
                      {imageError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 rounded-lg z-10">
                          <p className="text-muted-foreground text-sm text-center px-4">
                            Logo nije dostupan
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex gap-2 sm:gap-3">
                <Button
                  onClick={handleContinue}
                  className="flex-1 bg-primary hover:bg-primary/90 text-sm sm:text-base"
                  size="default"
                  disabled={isTransitioning}
                >
                  Continue
                </Button>
                <Button onClick={onReset} variant="secondary" size="default">
                  <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

