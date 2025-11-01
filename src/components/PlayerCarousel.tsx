import { useMemo, useState, useEffect, useRef } from "react";
import { Player } from "@/data/players";
import { getPlayerImageUrls } from "@/lib/playerImages";

interface PlayerCarouselProps {
  players: Player[];
}

export const PlayerCarousel = ({ players }: PlayerCarouselProps) => {
  // Shuffle players randomly - mixing NBA and Euroleague
  // This ensures NBA and Euroleague players are mixed randomly (one Euroleague, couple NBA, etc.)
  const shuffledPlayers = useMemo(() => {
    const shuffled = [...players];
    // Fisher-Yates shuffle algorithm for true randomization
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [players]);

  // Create player card component with lazy loading
  const PlayerCard = ({ player, uniqueKey, index }: { player: Player; uniqueKey: string; index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Only start loading images that are initially visible (first 10-15)
      if (index < 15) {
        setShouldLoad(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              // Delay loading slightly to avoid loading everything at once
              setTimeout(() => {
                setShouldLoad(true);
              }, Math.min(index * 10, 200)); // Stagger loading
            }
          });
        },
        {
          rootMargin: "200px", // Start loading 200px before visible
          threshold: 0.01,
        }
      );

      if (cardRef.current) {
        observer.observe(cardRef.current);
      }

      return () => {
        if (cardRef.current) {
          observer.unobserve(cardRef.current);
        }
      };
    }, [index]);

    const imageUrls = getPlayerImageUrls(player);
    const imageUrl = imageUrls.length > 0 ? imageUrls[0] : "";

    return (
      <div ref={cardRef} key={uniqueKey} className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
        <div className="w-[118px] h-[118px] rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center border-2 border-game-border">
          {shouldLoad && imageUrl ? (
            <img
              src={imageUrl}
              alt={player.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              fetchPriority={index < 5 ? "high" : "auto"}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="text-xs text-muted-foreground text-center px-2">
              {player.name}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-[118px] truncate">
          {player.name}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full bg-card/50 backdrop-blur border-t border-game-border py-4 overflow-hidden relative">
      <div className="flex infinite-scroll">
        {/* First set */}
        <div className="flex gap-0 flex-shrink-0">
          {shuffledPlayers.map((player, index) => (
            <PlayerCard 
              key={`first-${player.id}-${index}`} 
              player={player} 
              uniqueKey={`first-${player.id}-${index}`} 
              index={index}
            />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-0 flex-shrink-0">
          {shuffledPlayers.map((player, index) => (
            <PlayerCard 
              key={`second-${player.id}-${index}`} 
              player={player} 
              uniqueKey={`second-${player.id}-${index}`} 
              index={index + shuffledPlayers.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

