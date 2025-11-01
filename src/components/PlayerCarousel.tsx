import { useState, useEffect, useRef } from "react";
import { Player } from "@/data/players";
import { getPlayerImageUrls } from "@/lib/playerImages";

interface PlayerCarouselProps {
  players: Player[];
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

  // Calculate animation duration based on screen size
  const getAnimationDuration = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return 420; // 60 seconds on mobile
    }
    return 420; // 120 seconds on desktop
  };

  // JavaScript-based animation that doesn't reset on re-render
  useEffect(() => {
    const container = animationContainerRef.current;
    if (!container) return;

    const duration = getAnimationDuration();
    const totalWidth = container.scrollWidth / 2; // Half width for seamless loop

    const animate = (currentTime: number) => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        startTimeRef.current = currentTime;
      }

      const elapsed = (currentTime - startTimeRef.current) / 1000; // Convert to seconds
      const progress = (elapsed % duration) / duration;
      const offset = -progress * totalWidth;
      
      currentOffsetRef.current = offset;
      container.style.transform = `translateX(${offset}px)`;
      
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
  }, []);

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

  // Create player card component with lazy loading
  const PlayerCard = ({ player, uniqueKey, index }: { player: Player; uniqueKey: string; index: number }) => {
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
        const imageUrls = getPlayerImageUrls(player);
        const imageUrl = imageUrls.length > 0 ? imageUrls[0] : "";
        
        if (imageUrl) {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => setImageLoaded(true);
          img.onerror = () => setImageLoaded(false);
        }
      }
    }, [shouldLoad, imageLoaded, player]);

    const imageUrls = getPlayerImageUrls(player);
    const imageUrl = imageUrls.length > 0 ? imageUrls[0] : "";

    return (
      <div ref={cardRef} key={uniqueKey} className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
        <div className="w-[118px] h-[118px] rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center border-2 border-game-border relative">
          {shouldLoad && imageUrl ? (
            <>
              {/* Placeholder while loading */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 animate-pulse">
                  <div className="text-xs text-muted-foreground text-center px-2">
                    {player.name}
                  </div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={player.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
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
      <div ref={animationContainerRef} className="flex" style={{ willChange: 'transform' }}>
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

