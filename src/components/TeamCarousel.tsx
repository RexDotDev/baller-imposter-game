import { useState, useEffect, useRef } from "react";
import { Team } from "@/data/teams";
import { IdentityBadge } from "@/components/IdentityBadge";
import { secureShuffle } from "@/lib/random";

interface TeamCarouselProps {
  teams: Team[];
}

// Use secure shuffle from random utility
const shuffleArray = secureShuffle;

// Helper function to create shuffled teams list
const createShuffledTeams = (teams: Team[]): Team[] => {
  // Separate teams by league for better mixing
  const nbaTeams = teams.filter(t => t.league === "NBA");
  const euroleagueTeams = teams.filter(t => t.league === "Euroleague");
  
  const shuffledNBA = shuffleArray(nbaTeams);
  const shuffledEuroleague = shuffleArray(euroleagueTeams);
  
  // Interleave the two groups randomly
  const mixed: Team[] = [];
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

export const TeamCarousel = ({ teams }: TeamCarouselProps) => {
  // Use ref to track previous teams list and only reshuffle if it actually changed
  const prevTeamsRef = useRef<string>("");
  const [shuffledTeams, setShuffledTeams] = useState<Team[]>(() => {
    return createShuffledTeams(teams);
  });
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const currentOffsetRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);

  // Calculate animation duration - faster for teams
  const getAnimationDuration = () => {
    // Much faster duration for teams (105 seconds = 1.75 minutes)
    return 55;
  };

  // JavaScript-based animation that doesn't reset on re-render
  useEffect(() => {
    const container = animationContainerRef.current;
    if (!container || shuffledTeams.length === 0) return;

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
  }, [shuffledTeams.length]);

  // Only reshuffle if the teams list actually changed (by IDs)
  useEffect(() => {
    const currentTeamsKey = teams.map(t => t.id).sort().join(",");
    
    // Only reshuffle if team IDs changed (not just reference)
    if (currentTeamsKey !== prevTeamsRef.current) {
      prevTeamsRef.current = currentTeamsKey;
      // Update shuffled teams - animation will continue smoothly
      setShuffledTeams(createShuffledTeams(teams));
    }
  }, [teams]);

  const TeamCard = ({ team, uniqueKey }: { team: Team; uniqueKey: string; index: number }) => {
    return (
      <div key={uniqueKey} className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
        <IdentityBadge name={team.name} subtitle={team.league} className="h-[118px] w-[118px] rounded-lg" />
        <p className="text-xs text-muted-foreground text-center max-w-[118px] truncate">
          {team.name}
        </p>
      </div>
    );
  };


  // Ensure we have enough teams for seamless loop
  if (shuffledTeams.length === 0) {
    return null;
  }

  // If we have very few teams, duplicate them multiple times for smooth loop
  const getDisplayTeams = () => {
    if (shuffledTeams.length < 10) {
      // Duplicate teams multiple times to ensure smooth scrolling
      const multiplier = Math.ceil(20 / shuffledTeams.length);
      return Array(multiplier).fill(shuffledTeams).flat();
    }
    return shuffledTeams;
  };

  const displayTeams = getDisplayTeams();

  return (
    <div className="w-full bg-card/50 backdrop-blur border-t border-game-border py-4 overflow-hidden relative">
      <div ref={animationContainerRef} className="flex" style={{ willChange: 'transform' }}>
        {/* First set */}
        <div className="flex gap-0 flex-shrink-0">
          {displayTeams.map((team, index) => (
            <TeamCard 
              key={`first-${team.id}-${index}`} 
              team={team} 
              uniqueKey={`first-${team.id}-${index}`} 
              index={index}
            />
          ))}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex gap-0 flex-shrink-0">
          {displayTeams.map((team, index) => (
            <TeamCard 
              key={`second-${team.id}-${index}`} 
              team={team} 
              uniqueKey={`second-${team.id}-${index}`} 
              index={index + displayTeams.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
