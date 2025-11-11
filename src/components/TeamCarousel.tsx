import { useState, useEffect, useRef } from "react";
import { Team } from "@/data/teams";

interface TeamCarouselProps {
  teams: Team[];
}

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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
    // Faster duration for teams (210 seconds = 3.5 minutes)
    return 210;
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

  // Create team card component with lazy loading
  const TeamCard = ({ team, uniqueKey, index }: { team: Team; uniqueKey: string; index: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Preload first 20 images immediately for better initial experience
      if (index < 20) {
        setShouldLoad(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              // Start loading immediately when visible, but stagger slightly for smooth scrolling
              const delay = Math.min(index * 5, 100);
              setTimeout(() => {
                setShouldLoad(true);
              }, delay);
            }
          });
        },
        {
          rootMargin: "300px", // Increased margin for earlier loading
          threshold: 0.01,
        }
      );

      const currentCard = cardRef.current;
      if (currentCard) {
        observer.observe(currentCard);
      }

      return () => {
        if (currentCard) {
          observer.unobserve(currentCard);
        }
      };
    }, [index]);

    // Preload image when shouldLoad becomes true
    useEffect(() => {
      if (shouldLoad && !imageLoaded) {
        if (team.logoUrl) {
          const img = new Image();
          img.src = team.logoUrl;
          img.onload = () => setImageLoaded(true);
          img.onerror = () => setImageLoaded(false);
        }
      }
    }, [shouldLoad, imageLoaded, team]);

    return (
      <div ref={cardRef} key={uniqueKey} className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
        <div className="w-[118px] h-[118px] rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center border-2 border-game-border relative">
          {shouldLoad && team.logoUrl ? (
            <>
              {/* Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 animate-pulse">
                  <div className="text-xs text-muted-foreground text-center px-2">
                    {team.name}
                  </div>
                </div>
              )}
              <img
                src={team.logoUrl}
                alt={team.name}
                className={`w-full h-full object-contain p-2 transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading={index < 10 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 10 ? "high" : index < 30 ? "low" : "auto"}
                width="118"
                height="118"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  setImageLoaded(false);
                }}
              />
            </>
          ) : (
            <div className="text-xs text-muted-foreground text-center px-2">
              {team.name}
            </div>
          )}
        </div>
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

