import { useState, useEffect, useRef } from "react";
import { Player } from "@/data/players";
import { IdentityBadge } from "@/components/IdentityBadge";
import { secureShuffle } from "@/lib/random";

interface PlayerCarouselProps {
  players: Player[];
}

// Use secure shuffle from random utility
const shuffleArray = secureShuffle;

// Helper function to create shuffled players list
const createShuffledPlayers = (players: Player[]): Player[] => {
  // Separate players by league for better mixing
  const nbaPlayers = players.filter(p => p.league === "NBA");
  const euroleaguePlayers = players.filter(p => p.league === "Euroleague");
  
  const shuffledNBA = shuffleArray(nbaPlayers);
  const shuffledEuroleague = shuffleArray(euroleaguePlayers);
  
  // Interleave the two groups randomly
  const mixed: Player[] = [];
  let nbaIndex = 0;
  let euroIndex = 0;
  
  while (nbaIndex < shuffledNBA.length || euroIndex < shuffledEuroleague.length) {
    // Randomly decide which league to take next (weighted by remaining items)
    const nbaRemaining = shuffledNBA.length - nbaIndex;
    const euroRemaining = shuffledEuroleague.length - euroIndex;
    const totalRemaining = nbaRemaining + euroRemaining;
    
    if (nbaRemaining === 0) {
      mixed.push(...shuffledEuroleague.slice(euroIndex));
      break;
    }
    if (euroRemaining === 0) {
      mixed.push(...shuffledNBA.slice(nbaIndex));
      break;
    }
    
    // Random selection based on remaining proportion
    const random = Math.random();
    if (random < nbaRemaining / totalRemaining) {
      mixed.push(shuffledNBA[nbaIndex++]);
    } else {
      mixed.push(shuffledEuroleague[euroIndex++]);
    }
  }
  
  // Final shuffle to ensure complete randomness
  return shuffleArray(mixed);
};

export const PlayerCarousel = ({ players }: PlayerCarouselProps) => {
  // Use ref to track previous players list and only reshuffle if it actually changed
  const prevPlayersRef = useRef<string>("");
  const [shuffledPlayers, setShuffledPlayers] = useState<Player[]>(() => {
    return createShuffledPlayers(players);
  });
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const currentOffsetRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  // Calculate animation duration - same speed for all modes
  const getAnimationDuration = () => {
    // Same duration for all screen sizes and modes (420 seconds = 7 minutes)
    return 420;
  };

  // JavaScript-based animation that doesn't reset on re-render
  useEffect(() => {
    const container = animationContainerRef.current;
    if (!container || shuffledPlayers.length === 0) return;

    const duration = getAnimationDuration();
    
    const animate = (currentTime: number) => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        startTimeRef.current = currentTime;
      }

      // Calculate total width of one set
      const firstSet = container.children[0] as HTMLElement;
      if (!firstSet) return;
      
      const totalWidth = firstSet.offsetWidth;
      
      // If total width is 0 or very small, wait a bit and retry
      if (totalWidth < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000; // Convert to seconds
      const progress = (elapsed % duration) / duration;
      const offset = -progress * totalWidth;
      
      // Reset to start position when we've moved one full set width
      if (Math.abs(offset) >= totalWidth) {
        startTimeRef.current = currentTime;
        container.style.transform = `translateX(0px)`;
      } else {
        currentOffsetRef.current = offset;
        container.style.transform = `translateX(${offset}px)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        isAnimatingRef.current = false;
      }
    };
  }, [shuffledPlayers.length]);

  // Only reshuffle if the players list actually changed (by IDs)
  useEffect(() => {
    const currentPlayersKey = players.map(p => p.id).sort().join(",");
    
    // Only reshuffle if player IDs changed (not just reference)
    if (currentPlayersKey !== prevPlayersRef.current) {
      prevPlayersRef.current = currentPlayersKey;
      // Update shuffled players - animation will continue smoothly
      setShuffledPlayers(createShuffledPlayers(players));
    }
  }, [players]);

  const PlayerCard = ({ player, uniqueKey }: { player: Player; uniqueKey: string; index: number }) => {
    return (
      <div key={uniqueKey} className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
        <IdentityBadge name={player.name} subtitle={player.league} className="h-[118px] w-[118px] rounded-lg" />
        <p className="text-xs text-muted-foreground text-center max-w-[118px] truncate">
          {player.name}
        </p>
      </div>
    );
  };


  // Ensure we have enough players for seamless loop
  if (shuffledPlayers.length === 0) {
    return null;
  }

  // If we have very few players, duplicate them multiple times for smooth loop
  const getDisplayPlayers = () => {
    if (shuffledPlayers.length < 10) {
      // Duplicate players multiple times to ensure smooth scrolling
      const multiplier = Math.ceil(20 / shuffledPlayers.length);
      return Array(multiplier).fill(shuffledPlayers).flat();
    }
    return shuffledPlayers;
  };

  const displayPlayers = getDisplayPlayers();

  return (
    <div className="w-full bg-card/50 backdrop-blur border-t border-game-border py-4 overflow-hidden relative">
      <div ref={animationContainerRef} className="flex" style={{ willChange: 'transform' }}>
        {/* First set */}
        <div className="flex gap-0 flex-shrink-0">
          {displayPlayers.map((player, index) => (
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
          {displayPlayers.map((player, index) => (
            <PlayerCard 
              key={`second-${player.id}-${index}`} 
              player={player} 
              uniqueKey={`second-${player.id}-${index}`} 
              index={index + displayPlayers.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
