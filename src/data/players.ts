export interface Player {
  id: number;
  name: string;
  team: string;
  league: "NBA" | "Euroleague";
  imageUrl: string;
}

// Top 100 NBA Players (sample - in a real app, this would be a complete list)
export const nbaPlayers: Player[] = [
  { id: 1, name: "LeBron James", team: "Los Angeles Lakers", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 2, name: "Stephen Curry", team: "Golden State Warriors", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 3, name: "Kevin Durant", team: "Phoenix Suns", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 4, name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 5, name: "Luka Dončić", team: "Dallas Mavericks", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 6, name: "Nikola Jokić", team: "Denver Nuggets", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 7, name: "Joel Embiid", team: "Philadelphia 76ers", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 8, name: "Jayson Tatum", team: "Boston Celtics", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 9, name: "Damian Lillard", team: "Milwaukee Bucks", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 10, name: "Anthony Davis", team: "Los Angeles Lakers", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 11, name: "Kawhi Leonard", team: "LA Clippers", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 12, name: "Devin Booker", team: "Phoenix Suns", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 13, name: "Jimmy Butler", team: "Miami Heat", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 14, name: "Ja Morant", team: "Memphis Grizzlies", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 15, name: "Donovan Mitchell", team: "Cleveland Cavaliers", league: "NBA", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
];

// Top 100 Euroleague Players (sample)
export const euroleaguePlayers: Player[] = [
  { id: 101, name: "Nikola Mirotić", team: "Olimpia Milano", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 102, name: "Vasilije Micić", team: "Anadolu Efes", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 103, name: "Shane Larkin", team: "Anadolu Efes", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 104, name: "Mike James", team: "AS Monaco", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 105, name: "Sasha Vezenkov", team: "Olympiacos", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 106, name: "Jan Vesely", team: "Fenerbahçe", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 107, name: "Mathias Lessort", team: "Partizan", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 108, name: "Guerschon Yabusele", team: "Real Madrid", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 109, name: "Walter Tavares", team: "Real Madrid", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 110, name: "Tornike Shengelia", team: "Virtus Bologna", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 111, name: "Kostas Sloukas", team: "Olympiacos", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 112, name: "Nick Calathes", team: "Fenerbahçe", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 113, name: "Scottie Wilbekin", team: "Fenerbahçe", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
  { id: 114, name: "Kevin Pangos", team: "Armani Milano", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop" },
  { id: 115, name: "Thomas Heurtel", team: "Real Madrid", league: "Euroleague", imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&h=200&fit=crop" },
];

export const allPlayers: Player[] = [...nbaPlayers, ...euroleaguePlayers];
