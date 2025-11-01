import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Loader2 } from "lucide-react";
import { Player } from "@/data/players";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getPlayerImageUrls } from "@/lib/playerImages";

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
  const [revealed, setRevealed] = useState(false); // Start with role hidden
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset revealed state when player changes
    setRevealed(false);
    setIsTransitioning(false);
  }, [currentPlayer]);

  useEffect(() => {
    if (assignedPlayer && revealed) {
      setImageLoading(true);
      setImageError(false);
      setImageIndex(0);
      
      // Preload image when player is revealed for faster display
      const imageUrls = getPlayerImageUrls(assignedPlayer);
      if (imageUrls.length > 0) {
        // Use link preload for better mobile performance
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageUrls[0];
        if ('fetchPriority' in link) {
          (link as any).fetchPriority = 'high';
        }
        document.head.appendChild(link);
        
        // Prefetch next image if available for smoother transitions
        if (imageUrls.length > 1) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.as = 'image';
          prefetchLink.href = imageUrls[1];
          document.head.appendChild(prefetchLink);
        }
        
        // Preload image in memory for instant display
        const img = new Image();
        img.src = imageUrls[0];
        img.loading = 'eager';
        
        // Set timeout to avoid indefinite loading
        const timeoutId = setTimeout(() => {
          setImageLoading(false);
        }, 5000); // 5 second timeout
        
        img.onload = () => {
          clearTimeout(timeoutId);
          setImageLoading(false);
          setImageError(false);
          // Cleanup preload link
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        };
        img.onerror = () => {
          clearTimeout(timeoutId);
          setImageLoading(false);
          setImageError(false); // Let img tag handle error display
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        };
        
        return () => {
          clearTimeout(timeoutId);
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
        };
      } else {
        setImageLoading(false);
      }
    }
  }, [assignedPlayer, revealed, currentPlayer]);

  const handleContinue = () => {
    setIsTransitioning(true);
    // Wait for fade-out animation before calling onContinue
    setTimeout(() => {
      onContinue();
    }, 150); // Match fade-out duration
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
            <div className="text-center flex flex-col items-center justify-center min-h-[180px] sm:min-h-[250px] md:min-h-[400px]">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-destructive impostor-glow">
                IMPOSTOR
              </h3>
            </div>
          ) : assignedPlayer ? (
              <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                <div className="space-y-0.5 sm:space-y-1 md:space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{assignedPlayer.name}</h3>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground">{assignedPlayer.team}</p>
                  <p className="text-sm sm:text-base md:text-lg text-primary font-semibold">{assignedPlayer.league}</p>
                </div>
                
                {/* Player Image Carousel */}
                {(() => {
                  const imageUrls = getPlayerImageUrls(assignedPlayer);
                  if (imageUrls.length > 0) {
                    // Use imageIndex to show the correct image
                    const displayUrl = imageUrls[imageIndex] || imageUrls[0];
                    
                    return (
                      <div className="mt-2 sm:mt-4 md:mt-6 w-full px-2">
                        <Carousel className="w-full">
                          <CarouselContent className="-ml-2 md:-ml-4">
                            <CarouselItem className="pl-2 md:pl-4 basis-full">
                              <div className="flex items-center justify-center p-1 sm:p-2 relative min-h-[180px] sm:min-h-[250px] md:min-h-[400px]">
                                {imageLoading && !imageError && (
                                  <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                                  </div>
                                )}
                                <img
                                  key={`${displayUrl}-${imageIndex}`}
                                  src={displayUrl}
                                  alt={assignedPlayer.name}
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
                                  onLoad={(e) => {
                                    setImageLoading(false);
                                    setImageError(false);
                                    // Force reflow for smooth transition
                                    (e.target as HTMLImageElement).offsetHeight;
                                  }}
                                  onError={(e) => {
                                    console.error("Failed to load image:", displayUrl, "Player:", assignedPlayer.name, "League:", assignedPlayer.league);
                                    // Try next image if available
                                    if (imageUrls.length > imageIndex + 1) {
                                      setImageIndex(imageIndex + 1);
                                      setImageLoading(true);
                                    } else {
                                      // Try alternative URL format (without encoding)
                                      const altUrl = displayUrl.replace(/%20/g, ' ').replace(/%2C/g, ',').replace(/%28/g, '(').replace(/%29/g, ')');
                                      if (altUrl !== displayUrl) {
                                        (e.target as HTMLImageElement).src = altUrl;
                                        setImageLoading(true);
                                      } else {
                                        setImageLoading(false);
                                        setImageError(true);
                                      }
                                    }
                                  }}
                                />
                                {imageError && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/50 rounded-lg z-10">
                                    <p className="text-muted-foreground text-sm text-center px-4">
                                      Slika nije dostupna
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CarouselItem>
                          </CarouselContent>
                        </Carousel>
                      </div>
                    );
                  }
                  return null;
                })()}
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
