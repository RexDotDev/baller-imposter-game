import { Player } from "@/data/players";
import { Card } from "@/components/ui/card";

interface PlayerGridProps {
  players: Player[];
}

export const PlayerGrid = ({ players }: PlayerGridProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max px-4">
        {players.map((player) => (
          <Card
            key={player.id}
            className="flex-shrink-0 w-32 overflow-hidden border-game-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer group"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={player.imageUrl}
                alt={player.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-2 bg-card/80 backdrop-blur">
              <p className="text-xs font-semibold truncate">{player.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
