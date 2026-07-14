import { useState, useEffect, useRef } from "react";
import { Player } from "@/data/players";
import { Team } from "@/data/teams";
import { IdentityBadge } from "@/components/IdentityBadge";
import { secureShuffle } from "@/lib/random";
import { getPlayerImageUrl } from "@/lib/playerImages";

interface MixedCarouselProps {
  players: Player[];
  teams: Team[];
}

type CarouselItem = { type: "player"; data: Player } | { type: "team"; data: Team };

// Use secure shuffle from random utility
const shuffleArray = secureShuffle;

// Helper function to create shuffled mixed items list
const createShuffledItems = (players: Player[], teams: Team[]): CarouselItem[] => {
  // Convert to items
  const playerItems: CarouselItem[] = players.map(p => ({ type: "player" as const, data: p }));
  const teamItems: CarouselItem[] = teams.map(t => ({ type: "team" as const, data: t }));
  
  // Shuffle each group
  const shuffledPlayers = shuffleArray(playerItems);
  const shuffledTeams = shuffleArray(teamItems);
  
  // Interleave the two groups randomly
  const mixed: CarouselItem[] = [];
  let playerIndex = 0;
  let teamIndex = 0;
  
  while (playerIndex < shuffledPlayers.length || teamIndex < shuffledTeams.length) {
    // Randomly decide which type to take next (weighted by remaining items)
    const playerRemaining = shuffledPlayers.length - playerIndex;
    const teamRemaining = shuffledTeams.length - teamIndex;
    const totalRemaining = playerRemaining + teamRemaining;
    
    if (playerRemaining === 0) {
      mixed.push(...shuffledTeams.slice(teamIndex));
      break;
    }
    if (teamRemaining === 0) {
      mixed.push(...shuffledPlayers.slice(playerIndex));
      break;
    }
    
    // Random selection based on remaining proportion
    const random = Math.random();
    if (random < playerRemaining / totalRemaining) {
      mixed.push(shuffledPlayers[playerIndex++]);
    } else {
      mixed.push(shuffledTeams[teamIndex++]);
    }
  }
  
  // Final shuffle to ensure complete randomness
  return shuffleArray(mixed);
};

export const MixedCarousel = ({ players, teams }: MixedCarouselProps) => {
  // Use ref to track previous items list and only reshuffle if it actually changed
  const prevItemsRef = useRef<string>("");
  const [shuffledItems, setShuffledItems] = useState<CarouselItem[]>(() => {
    return createShuffledItems(players, teams);
  });
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const currentOffsetRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  // Calculate animation duration - faster for mixed content
  const getAnimationDuration = () => {
    return 285; // 1.75 minutes - much faster since it includes teams
  };

  // JavaScript-based animation that doesn't reset on re-render
  useEffect(() => {
    const container = animationContainerRef.current;
    if (!container || shuffledItems.length === 0) return;

    const duration = getAnimationDuration();
    
    const animate = (currentTime: number) => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        startTimeRef.current = currentTime;
      }

      const firstSet = container.children[0] as HTMLElement;
      if (!firstSet) return;
      
      const totalWidth = firstSet.offsetWidth;
      
      if (totalWidth < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const progress = (elapsed % duration) / duration;
      const offset = -progress * totalWidth;
      
      if (Math.abs(offset) >= totalWidth) {
        startTimeRef.current = currentTime;
        container.style.transform = `translateX(0px)`;
      } else {
        currentOffsetRef.current = offset;
        container.style.transform = `translateX(${offset}px)`;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        isAnimatingRef.current = false;
      }
    };
  }, [shuffledItems.length]);

  // Only reshuffle if the items list actually changed
  useEffect(() => {
    const playersKey = players.map(p => p.id).sort().join(",");
    const teamsKey = teams.map(t => t.id).sort().join(",");
    const currentItemsKey = `${playersKey}|${teamsKey}`;
    
    if (currentItemsKey !== prevItemsRef.current) {
      prevItemsRef.current = currentItemsKey;
      setShuffledItems(createShuffledItems(players, teams));
    }
  }, [players, teams]);

  const ItemCard = ({ item, uniqueKey }: { item: CarouselItem; uniqueKey: string; index: number }) => {
    const displayName = item.data.name;

    return (
      <div key={uniqueKey} className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
        <IdentityBadge
          name={displayName}
          subtitle={item.type === "player" ? item.data.league : `Team · ${item.data.league}`}
          imageUrl={item.type === "player" ? getPlayerImageUrl(item.data) : item.data.logoUrl}
          imageClassName={item.type === "player" ? "object-contain" : "object-contain p-3"}
          className="h-[118px] w-[118px] rounded-lg"
        />
        <p className="text-xs text-muted-foreground text-center max-w-[118px] truncate">
          {displayName}
        </p>
      </div>
    );
  };

  if (shuffledItems.length === 0) {
    return null;
  }

  const getDisplayItems = () => {
    if (shuffledItems.length < 10) {
      const multiplier = Math.ceil(20 / shuffledItems.length);
      return Array(multiplier).fill(shuffledItems).flat();
    }
    return shuffledItems;
  };

  const displayItems = getDisplayItems();

  return (
    <div className="w-full bg-card/50 backdrop-blur border-t border-game-border py-4 overflow-hidden relative">
      <div ref={animationContainerRef} className="flex" style={{ willChange: 'transform' }}>
        {/* First set */}
        <div className="flex gap-0 flex-shrink-0">
          {displayItems.map((item, index) => (
            <ItemCard 
              key={`first-${item.type}-${item.data.id}-${index}`} 
              item={item} 
              uniqueKey={`first-${item.type}-${item.data.id}-${index}`} 
              index={index}
            />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-0 flex-shrink-0">
          {displayItems.map((item, index) => (
            <ItemCard 
              key={`second-${item.type}-${item.data.id}-${index}`} 
              item={item} 
              uniqueKey={`second-${item.type}-${item.data.id}-${index}`} 
              index={index + displayItems.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
