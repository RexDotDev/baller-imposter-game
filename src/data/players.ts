import player1 from "@/assets/player1.jpg";
import player2 from "@/assets/player2.jpg";
import player3 from "@/assets/player3.jpg";
import player4 from "@/assets/player4.jpg";
import player5 from "@/assets/player5.jpg";
import player6 from "@/assets/player6.jpg";

export interface Player {
  id: number;
  name: string;
  team: string;
  league: "NBA" | "Euroleague";
  imageUrl: string;
}

const playerImages = [player1, player2, player3, player4, player5, player6];

// Top 100 NBA Players
export const nbaPlayers: Player[] = [
  { id: 1, name: "LeBron James", team: "Los Angeles Lakers", league: "NBA", imageUrl: playerImages[0] },
  { id: 2, name: "Stephen Curry", team: "Golden State Warriors", league: "NBA", imageUrl: playerImages[1] },
  { id: 3, name: "Kevin Durant", team: "Phoenix Suns", league: "NBA", imageUrl: playerImages[2] },
  { id: 4, name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", league: "NBA", imageUrl: playerImages[3] },
  { id: 5, name: "Luka Dončić", team: "Dallas Mavericks", league: "NBA", imageUrl: playerImages[4] },
  { id: 6, name: "Nikola Jokić", team: "Denver Nuggets", league: "NBA", imageUrl: playerImages[5] },
  { id: 7, name: "Joel Embiid", team: "Philadelphia 76ers", league: "NBA", imageUrl: playerImages[0] },
  { id: 8, name: "Jayson Tatum", team: "Boston Celtics", league: "NBA", imageUrl: playerImages[1] },
  { id: 9, name: "Damian Lillard", team: "Milwaukee Bucks", league: "NBA", imageUrl: playerImages[2] },
  { id: 10, name: "Anthony Davis", team: "Los Angeles Lakers", league: "NBA", imageUrl: playerImages[3] },
  { id: 11, name: "Kawhi Leonard", team: "LA Clippers", league: "NBA", imageUrl: playerImages[4] },
  { id: 12, name: "Devin Booker", team: "Phoenix Suns", league: "NBA", imageUrl: playerImages[5] },
  { id: 13, name: "Jimmy Butler", team: "Miami Heat", league: "NBA", imageUrl: playerImages[0] },
  { id: 14, name: "Ja Morant", team: "Memphis Grizzlies", league: "NBA", imageUrl: playerImages[1] },
  { id: 15, name: "Donovan Mitchell", team: "Cleveland Cavaliers", league: "NBA", imageUrl: playerImages[2] },
];

// Top 100 Euroleague Players
export const euroleaguePlayers: Player[] = [
  { id: 101, name: "Nikola Mirotić", team: "Olimpia Milano", league: "Euroleague", imageUrl: playerImages[3] },
  { id: 102, name: "Vasilije Micić", team: "Anadolu Efes", league: "Euroleague", imageUrl: playerImages[4] },
  { id: 103, name: "Shane Larkin", team: "Anadolu Efes", league: "Euroleague", imageUrl: playerImages[5] },
  { id: 104, name: "Mike James", team: "AS Monaco", league: "Euroleague", imageUrl: playerImages[0] },
  { id: 105, name: "Sasha Vezenkov", team: "Olympiacos", league: "Euroleague", imageUrl: playerImages[1] },
  { id: 106, name: "Jan Vesely", team: "Fenerbahçe", league: "Euroleague", imageUrl: playerImages[2] },
  { id: 107, name: "Mathias Lessort", team: "Partizan", league: "Euroleague", imageUrl: playerImages[3] },
  { id: 108, name: "Guerschon Yabusele", team: "Real Madrid", league: "Euroleague", imageUrl: playerImages[4] },
  { id: 109, name: "Walter Tavares", team: "Real Madrid", league: "Euroleague", imageUrl: playerImages[5] },
  { id: 110, name: "Tornike Shengelia", team: "Virtus Bologna", league: "Euroleague", imageUrl: playerImages[0] },
  { id: 111, name: "Kostas Sloukas", team: "Olympiacos", league: "Euroleague", imageUrl: playerImages[1] },
  { id: 112, name: "Nick Calathes", team: "Fenerbahçe", league: "Euroleague", imageUrl: playerImages[2] },
  { id: 113, name: "Scottie Wilbekin", team: "Fenerbahçe", league: "Euroleague", imageUrl: playerImages[3] },
  { id: 114, name: "Kevin Pangos", team: "Armani Milano", league: "Euroleague", imageUrl: playerImages[4] },
  { id: 115, name: "Thomas Heurtel", team: "Real Madrid", league: "Euroleague", imageUrl: playerImages[5] },
];

export const allPlayers: Player[] = [...nbaPlayers, ...euroleaguePlayers];
