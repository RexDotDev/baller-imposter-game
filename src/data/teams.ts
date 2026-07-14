export interface Team {
  id: number;
  name: string;
  league: "NBA" | "Euroleague";
}

const nbaTeamNames = [
  "Atlanta Hawks", "Boston Celtics", "Brooklyn Nets", "Charlotte Hornets", "Chicago Bulls",
  "Cleveland Cavaliers", "Dallas Mavericks", "Denver Nuggets", "Detroit Pistons", "Golden State Warriors",
  "Houston Rockets", "Indiana Pacers", "LA Clippers", "Los Angeles Lakers", "Memphis Grizzlies",
  "Miami Heat", "Milwaukee Bucks", "Minnesota Timberwolves", "New Orleans Pelicans", "New York Knicks",
  "Oklahoma City Thunder", "Orlando Magic", "Philadelphia 76ers", "Phoenix Suns", "Portland Trail Blazers",
  "Sacramento Kings", "San Antonio Spurs", "Toronto Raptors", "Utah Jazz", "Washington Wizards",
];

const euroleagueTeamNames = [
  "Anadolu Efes", "AS Monaco", "ASVEL Lyon-Villeurbanne", "FC Barcelona", "Baskonia Vitoria-Gasteiz",
  "Bayern Munich", "Dubai Basketball", "EA7 Emporio Armani Milano", "Fenerbahce", "Hapoel Tel Aviv",
  "Crvena Zvezda", "Partizan", "Maccabi Tel Aviv", "Olympiacos", "Panathinaikos",
  "Paris Basketball", "Real Madrid", "Valencia Basket", "Virtus Bologna", "Zalgiris Kaunas",
];

export const nbaTeams: Team[] = nbaTeamNames.map((name, index) => ({ id: index + 1, name, league: "NBA" }));
export const euroleagueTeams: Team[] = euroleagueTeamNames.map((name, index) => ({ id: nbaTeamNames.length + index + 1, name, league: "Euroleague" }));
export const allTeams: Team[] = [...nbaTeams, ...euroleagueTeams];
