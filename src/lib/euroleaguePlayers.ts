/**
 * Helper function to convert filename format (ImePrezime) to display format (Ime Prezime)
 * Example: "MosesWright" -> "Moses Wright"
 * Example: "NikolaMirotic" -> "Nikola Mirotic"
 * Example: "NigelWilliams-Goss" -> "Nigel Williams-Goss"
 * Example: "isaiaCordinier" -> "Isaia Cordinier"
 * Example: "PjDozier" -> "PJ Dozier"
 */
export function filenameToPlayerName(filename: string): string {
  // Remove .png extension
  let name = filename.replace(/\.png$/i, "");
  
  // Handle special cases first
  const specialCases: Record<string, string> = {
    "isaiaCordinier": "Isaia Cordinier",
    "PjDozier": "PJ Dozier",
    "GerogiosPapagiannis": "Georgios Papagiannis",
    "NickWeilerBabb": "Nick Weiler-Babb",
    "TJShorts": "TJ Shorts",
    "CodiMillerMcIntyre": "Codi Miller-McIntyre",
    "NandoDeColo": "Nando De Colo",
    "TalonHorton-Tucker": "Talon Horton-Tucker",
    "NigelWilliams-Goss": "Nigel Williams-Goss",
    "TimotheLuwawu-Cabarrot": "Timothe Luwawu-Cabarrot",
    "WalterTavares": "Edy Tavares", // Walter Tavares is known as Edy Tavares
    "SasaVezenkov": "Sasha Vezenkov",
    "AntonioBlanakey": "Antonio Blakeney",
  };
  
  if (specialCases[name]) {
    return specialCases[name];
  }
  
  // Insert space before capital letters (but not at the start)
  // Also handle special cases like hyphens
  let result = name
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Space before capital after lowercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Space before capital sequence followed by lowercase
  
  return result;
}

/**
 * Get team name from player name (placeholder - you may want to update with actual teams)
 */
export function getEuroleagueTeam(playerName: string): string {
  // Common Euroleague teams - you can expand this list
  const teamMap: Record<string, string> = {
    "Kendrick Nunn": "Panathinaikos",
    "Sasha Vezenkov": "Olympiacos",
    "TJ Shorts": "Panathinaikos",
    "Mike James": "Monaco",
    "Wade Baldwin": "Fenerbahce",
    "Edy Tavares": "Real Madrid",
    "Evan Fournier": "Olympiacos",
    "Nikola Mirotic": "Monaco",
    "Shane Larkin": "Anadolu Efes",
    "Facundo Campazzo": "Real Madrid",
    "Vasilije Micic": "Hapoel Tel Aviv",
    "Talon Horton-Tucker": "Fenerbahce",
    "Kevin Punter": "Barcelona",
    "Zach LeDay": "Milan",
    "Theo Maledon": "Real Madrid",
    "Nick Weiler-Babb": "Anadolu Efes",
    "Elijah Bryant": "Hapoel Tel Aviv",
    "Jabari Parker": "Partizan",
    "Tornike Shengelia": "Barcelona",
    "Lonnie Walker": "Maccabi Tel Aviv",
    "Dzanan Musa": "Dubai",
    "Cedi Osman": "Panathinaikos",
    "Mario Hezonja": "Real Madrid",
    "Carsen Edwards": "Virtus Bologna",
    "Marko Guduric": "Milan",
    "Carlik Jones": "Partizan",
    "Juancho Hernangomez": "Panathinaikos",
    "Chima Moneke": "Crvena Zvezda",
    "Nigel Williams-Goss": "Zalgiris",
    "Devin Booker": "Milan",
    "Trey Lyles": "Real Madrid",
    "Jerian Grant": "Panathinaikos",
    "Daniel Theis": "Monaco",
    "Devon Hall": "Fenerbahce",
    "Sylvain Francisco": "Zalgiris",
    "Nadir Hifi": "Paris",
    "Nikola Milutinov": "Olympiacos",
    "Codi Miller-McIntyre": "Crvena Zvezda",
    "Shake Milton": "Partizan",
    "Kostas Sloukas": "Panathinaikos",
    "Jaylen Hoard": "Maccabi Tel Aviv",
    "Alpha Diallo": "Monaco",
    "Marcus Howard": "Baskonia",
    "Filip Petrusev": "Dubai",
    "Bonzie Colson": "Fenerbahce",
    "Richaun Holmes": "Panathinaikos",
    "Jordan Loyd": "Anadolu Efes",
    "Andreas Obst": "Bayern Munich",
    "Nando De Colo": "ASVEL",
    "Jan Vesely": "Barcelona",
    "Spencer Dinwiddie": "Euroleague",
    "Davis Bertans": "Euroleague",
    "Bruno Caboclo": "Euroleague",
    "Frank Ntilikina": "Euroleague",
    "Gabriel Deck": "Euroleague",
    "Gabriele Procida": "Euroleague",
    "Nicolas Laprovittola": "Euroleague",
    "Tomas Satoransky": "Euroleague",
    "Scottie Wilbekin": "Euroleague",
    "Sergio Llul": "Euroleague",
    "Shavon Shields": "Euroleague",
    "Vladimir Lucic": "Euroleague",
    "Tarik Biberovic": "Euroleague",
    "Klemen Prepelic": "Euroleague",
    "Aleksa Avramovic": "Euroleague",
    "Stefan Jovic": "Euroleague",
    "Nemanja Nedovic": "Euroleague",
    "Roman Sorkin": "Euroleague",
    "Tamir Blatt": "Euroleague",
    "Thomas Walkup": "Euroleague",
    "Kostas Antetokounpo": "Euroleague",
    "Donta Hall": "Euroleague",
    "Bryant Dunston": "Euroleague",
    "Josh Nebo": "Euroleague",
    "Jonathan Motley": "Euroleague",
    "Kenan Kamenjas": "Euroleague",
    "Mfiondu Kabengele": "Euroleague",
    "Donatas Motiejunas": "Euroleague",
    "Wenyen Gabriel": "Euroleague",
    "Dwayne Bacon": "Euroleague",
    "Leandro Bolmaro": "Euroleague",
    "Armoni Brooks": "Euroleague",
    "Niccolo Mannion": "Euroleague",
    "Lorenzo Brown": "Euroleague",
    "Trent Forrest": "Euroleague",
    "Matthew Strazel": "Euroleague",
    "Keenan Evans": "Euroleague",
    "Tyler Dorsey": "Euroleague",
    "Yam Madar": "Euroleague",
    "Yago Dos Santos": "Euroleague",
    "Tyson Carter": "Euroleague",
    "Tyrique Jones": "Euroleague",
    "Tyson Ward": "Euroleague",
    "Sterling Brown": "Euroleague",
    "Semi Ojeleye": "Euroleague",
    "Mikael Jantunen": "Euroleague",
    "Miikka Muurinen": "Euroleague",
    "Mitar Bosnjakovic": "Euroleague",
    "Moses Wright": "Euroleague",
    "Luca Vildoza": "Euroleague",
    "Isaia Cordinier": "Euroleague",
    "Isaac Bonga": "Euroleague",
    "Isaiha Mike": "Euroleague",
    "Isaiah Canaan": "Euroleague",
    "Georgios Papagiannis": "Euroleague",
    "Elie Okobo": "Euroleague",
    "Dylan Osetkowski": "Euroleague",
    "Duane Washington": "Euroleague",
    "Dan Oturu": "Euroleague",
    "Dejan Davidovac": "Euroleague",
    "Devonte Graham": "Euroleague",
    "Jared Butler": "Euroleague",
    "Jasiel Rivero": "Euroleague",
    "Jordan Nwora": "Euroleague",
    "PJ Dozier": "Euroleague",
    "Antonio Blakeney": "Euroleague",
    "Arijan Lakic": "Euroleague",
    "Aleksej Pokusevski": "Euroleague",
    "Alen Smailagic": "Euroleague",
    "Chris Jones": "Euroleague",
    "Timothe Luwawu-Cabarrot": "Euroleague",
  };
  
  return teamMap[playerName] || "Euroleague";
}

