export interface Team {
  id: number;
  name: string;
  league: "NBA" | "Euroleague";
  logoUrl: string;
}

// NBA Teams with logos from nba_logos folder
export const nbaTeams: Team[] = [
  { id: 1, name: "Atlanta Hawks", league: "NBA", logoUrl: "/nba_logos/Atlanta_Hawks.svg" },
  { id: 2, name: "Boston Celtics", league: "NBA", logoUrl: "/nba_logos/Boston_Celtics.svg" },
  { id: 3, name: "Brooklyn Nets", league: "NBA", logoUrl: "/nba_logos/Brooklyn_Nets.svg" },
  { id: 4, name: "Charlotte Hornets", league: "NBA", logoUrl: "/nba_logos/Charlotte_Hornets.svg" },
  { id: 5, name: "Chicago Bulls", league: "NBA", logoUrl: "/nba_logos/Chicago_Bulls.svg" },
  { id: 6, name: "Cleveland Cavaliers", league: "NBA", logoUrl: "/nba_logos/Cleveland_Cavaliers.svg" },
  { id: 7, name: "Dallas Mavericks", league: "NBA", logoUrl: "/nba_logos/Dallas_Mavericks.svg" },
  { id: 8, name: "Denver Nuggets", league: "NBA", logoUrl: "/nba_logos/Denver_Nuggets.svg" },
  { id: 9, name: "Detroit Pistons", league: "NBA", logoUrl: "/nba_logos/Detroit_Pistons.svg" },
  { id: 10, name: "Golden State Warriors", league: "NBA", logoUrl: "/nba_logos/Golden_State_Warriors.svg" },
  { id: 11, name: "Houston Rockets", league: "NBA", logoUrl: "/nba_logos/Houston_Rockets.svg" },
  { id: 12, name: "Indiana Pacers", league: "NBA", logoUrl: "/nba_logos/Indiana_Pacers.svg" },
  { id: 13, name: "LA Clippers", league: "NBA", logoUrl: "/nba_logos/LA_Clippers.svg" },
  { id: 14, name: "Los Angeles Lakers", league: "NBA", logoUrl: "/nba_logos/Los_Angeles_Lakers.svg" },
  { id: 15, name: "Memphis Grizzlies", league: "NBA", logoUrl: "/nba_logos/Memphis_Grizzlies.svg" },
  { id: 16, name: "Miami Heat", league: "NBA", logoUrl: "/nba_logos/Miami_Heat.svg" },
  { id: 17, name: "Milwaukee Bucks", league: "NBA", logoUrl: "/nba_logos/Milwaukee_Bucks.svg" },
  { id: 18, name: "Minnesota Timberwolves", league: "NBA", logoUrl: "/nba_logos/Minnesota_Timberwolves.svg" },
  { id: 19, name: "New Orleans Pelicans", league: "NBA", logoUrl: "/nba_logos/New_Orleans_Pelicans.svg" },
  { id: 20, name: "New York Knicks", league: "NBA", logoUrl: "/nba_logos/New_York_Knicks.svg" },
  { id: 21, name: "Oklahoma City Thunder", league: "NBA", logoUrl: "/nba_logos/Oklahoma_City_Thunder.svg" },
  { id: 22, name: "Orlando Magic", league: "NBA", logoUrl: "/nba_logos/Orlando_Magic.svg" },
  { id: 23, name: "Philadelphia 76ers", league: "NBA", logoUrl: "/nba_logos/Philadelphia_76ers.svg" },
  { id: 24, name: "Phoenix Suns", league: "NBA", logoUrl: "/nba_logos/Phoenix_Suns.svg" },
  { id: 25, name: "Portland Trail Blazers", league: "NBA", logoUrl: "/nba_logos/Portland_Trail_Blazers.svg" },
  { id: 26, name: "Sacramento Kings", league: "NBA", logoUrl: "/nba_logos/Sacramento_Kings.svg" },
  { id: 27, name: "San Antonio Spurs", league: "NBA", logoUrl: "/nba_logos/San_Antonio_Spurs.svg" },
  { id: 28, name: "Toronto Raptors", league: "NBA", logoUrl: "/nba_logos/Toronto_Raptors.svg" },
  { id: 29, name: "Utah Jazz", league: "NBA", logoUrl: "/nba_logos/Utah_Jazz.svg" },
  { id: 30, name: "Washington Wizards", league: "NBA", logoUrl: "/nba_logos/Washington_Wizards.svg" },
];

// Euroleague Teams with logos from Euroleague_Teams folder
export const euroleagueTeams: Team[] = [
  { id: 31, name: "Anadolu Efes", league: "Euroleague", logoUrl: "/Euroleague_Teams/AnadoluEfes.webp" },
  { id: 32, name: "AS Monaco", league: "Euroleague", logoUrl: "/Euroleague_Teams/ASMonaco.webp" },
  { id: 33, name: "ASVEL Lyon-Villeurbanne", league: "Euroleague", logoUrl: "/Euroleague_Teams/ASVEL.webp" },
  { id: 34, name: "FC Barcelona", league: "Euroleague", logoUrl: "/Euroleague_Teams/Barcelona.webp" },
  { id: 35, name: "Baskonia Vitoria-Gasteiz", league: "Euroleague", logoUrl: "/Euroleague_Teams/Baskonia.webp" },
  { id: 36, name: "Bayern Munich", league: "Euroleague", logoUrl: "/Euroleague_Teams/Bayern.webp" },
  { id: 37, name: "Dubai Basketball", league: "Euroleague", logoUrl: "/Euroleague_Teams/DubaiBasketball.webp" },
  { id: 38, name: "EA7 Emporio Armani Milano", league: "Euroleague", logoUrl: "/Euroleague_Teams/EAMilano.webp" },
  { id: 39, name: "Fenerbahce", league: "Euroleague", logoUrl: "/Euroleague_Teams/Fenerbahce.webp" },
  { id: 40, name: "Hapoel Tel Aviv", league: "Euroleague", logoUrl: "/Euroleague_Teams/HapoelTelAviv.webp" },
  { id: 41, name: "Crvena Zvezda", league: "Euroleague", logoUrl: "/Euroleague_Teams/KKCrvenaZvezda.webp" },
  { id: 42, name: "Partizan", league: "Euroleague", logoUrl: "/Euroleague_Teams/KKPartizan.webp" },
  { id: 43, name: "Maccabi Tel Aviv", league: "Euroleague", logoUrl: "/Euroleague_Teams/Maccabi.webp" },
  { id: 44, name: "Olympiacos", league: "Euroleague", logoUrl: "/Euroleague_Teams/Olympiacos.webp" },
  { id: 45, name: "Panathinaikos", league: "Euroleague", logoUrl: "/Euroleague_Teams/Panathinaikos.webp" },
  { id: 46, name: "Paris Basketball", league: "Euroleague", logoUrl: "/Euroleague_Teams/ParisBasketball.webp" },
  { id: 47, name: "Real Madrid", league: "Euroleague", logoUrl: "/Euroleague_Teams/RealMadrid.webp" },
  { id: 48, name: "Valencia Basket", league: "Euroleague", logoUrl: "/Euroleague_Teams/Valencia.webp" },
  { id: 49, name: "Virtus Bologna", league: "Euroleague", logoUrl: "/Euroleague_Teams/VirtusBologna.webp" },
  { id: 50, name: "Zalgiris Kaunas", league: "Euroleague", logoUrl: "/Euroleague_Teams/ZalgirisKaunas.webp" },
];

// All teams combined
export const allTeams: Team[] = [...nbaTeams, ...euroleagueTeams];

