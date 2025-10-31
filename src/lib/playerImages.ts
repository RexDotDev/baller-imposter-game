import { Player } from "@/data/players";

/**
 * Maps player names to their image filenames
 * This is generated from the actual files in public/The NBA, Ranked_files
 */
const playerImageMap: Record<string, string[]> = {
  "Nikola Jokic": ["NikolaJokic-1729002012896-small.png"],
  "Shai Gilgeous-Alexander": ["ShaiGilgeousAlexander-1728927692340-small.png"],
  "Giannis Antetokounmpo": ["GiannisAntetekounmpo-1728920065023-small.png"],
  "Luka Doncic": ["LukaDoncic-1760451599428-small.png"],
  "Anthony Edwards": ["AnthonyEdwards-1728924472703-small.png"],
  "Victor Wembanyama": ["VictorWembanyama-1728928616499-small.png"],
  "Stephen Curry": ["StephCurry2025-1760448609992-small.png"],
  "Donovan Mitchell": ["DonovanMitchell2025-1760464130768-small.png"],
  "Jalen Brunson": ["JalenBrunson-1728924204078-small.png"],
  "Kevin Durant": ["KevinDurant2025-1760463563440-small.png"],
  "LeBron James": ["LebronJames-1728999922314-small.png"],
  "Anthony Davis": ["AnthonyDavis-1760450816291-small.png"],
  "Cade Cunningham": ["CadeCunningham-1728924306120-small.png"],
  "Kawhi Leonard": ["KawhiLeonard2025-1760455671505-small.png"],
  "Jalen Williams": ["JalenWilliams-1728926221522-small.png"],
  "Evan Mobley": ["EvanMobley-1728924962010-small.png"],
  "Karl-Anthony Towns": ["KarlAnthonyTowns-1728925312358-small.png"],
  "Devin Booker": ["DevinBooker-1728920490609-small.png"],
  "Paolo Banchero": ["PaoloBanchero-1760451020392-small.png"],
  "Jaylen Brown": ["JaylenBrown-1728927397366-small.png"],
  "Pascal Siakam": ["PascalSiakam-1728928522242-small.png"],
  "Alperen Sengun": ["AlperenSengun-1728929168424-small.png"],
  "Chet Holmgren": ["ChetHolmgren-1728924663469-small.png"],
  "James Harden": ["JamesHarden-new-1732046759070-small.png"],
  "Jimmy Butler": ["JimmyButler-Warriors-1739547119052-small.png"],
  "Bam Adebayo": ["BamAdebayo-1728926137044-small.png"],
  "Jaren Jackson Jr.": ["JarenJacksonJr-1728999745610-small.png"],
  "De'Aaron Fox": ["DeAaronFox-Spurs-1739547049660-small.png"],
  "Darius Garland": ["DariusGarland-1728927591265-small.png"],
  "Jamal Murray": ["JamalMurray-1728925040506-small.png"],
  "Trae Young": ["TraeYoung-1728924107843-small.png"],
  "Domantas Sabonis": ["DomantasSabonis-1728926026332-small.png"],
  "Tyrese Maxey": ["TyreseMaxey-new-1732046829648-small.png"],
  "Ja Morant": ["JaMorant2025-1760450383316-small.png"],
  "Amen Thompson": ["AmenThompson-1732046236820-small.png"],
  "Derrick White": ["DerrickWhite-1728925572065-small.png"],
  "Ivica Zubac": ["IvicaZubac-new-1733883049642-small.png"],
  "Franz Wagner": ["FranzWagner-1760464452314-small.png"],
  "Jalen Johnson": ["JalenJohnson-1728928730105-small.png"],
  "OG Anunoby": ["OGAnunoby-1728927132532-small.png"],
  "Aaron Gordon": ["AaronGordon-1728929332867-small.png"],
  "Scottie Barnes": ["ScottieBarnes-1728920416619-small.png"],
  "Lauri Markkanen": ["LauriMarkkanen-1728924877276-small.png"],
  "Desmond Bane": ["DesmondBane2025-1760452167703-small.png"],
  "Zion Williamson": ["ZionWilliamson2025-1760451984179-small.png"],
  "LaMelo Ball": ["LameloBall-1728920152693-small.png"],
  "Rudy Gobert": ["RudyGobert2025-1760467044594-small.png"],
  "Julius Randle": ["JuliusRandle-new-1733883165802-small.png"],
  "Dyson Daniels": ["DysonDaniels-1732045928692-small.png"],
  "Jarrett Allen": ["JarrettAllen-1728928439452-small.png"],
  "Draymond Green": ["DraymondGreen-1760448927439-small.png"],
  "Tyler Herro": ["TylerHerro-new-1733882995784-small.png"],
  "Deni Avdija": ["DeniAvdija-1740596877304-small.png"],
  "Trey Murphy III": ["TreyMurphyIII-1729000597205-small.png"],
  "Mikal Bridges": ["MikalBridges2025-1760455365419-small.png"],
  "Alex Caruso": ["AlexCaruso-new-1732046650792-small.png"],
  "Austin Reaves": ["AustinReaves-1728926751713-small.png"],
  "Jaden McDaniels": ["JadenMcDaniels-1728923677963-small.png"],
  "Brandon Ingram": ["BrandonIngram2025-1760478648387-small.png"],
  "Jalen Suggs": ["JalenSuggs-1760460221705-small.png"],
  "Cooper Flagg": ["CooperFlagg-1760464829105-small.png"],
  "Cam Johnson": ["CamJohnson2025-1760451472419-small.png"],
  "Myles Turner": ["MylesTurner-1760449416522-small.png"],
  "Andrew Nembhard": ["AndrewNembhard (1)-1748975357494-small.png"],
  "Isaiah Hartenstein": ["IsaiahHartenstein-new-1733883018491-small.png"],
  "Norm Powell": ["NormPowell2025-1760478662798-small.png"],
  "Kristaps Porzingis": ["KristapsPorzingis2025-1760478675984-small.png"],
  "Lu Dort": ["LuDort-2025-1736951001381-small.png"],
  "Coby White": ["CobyWhite-1728926582767-small.png"],
  "Jrue Holiday": ["JrueHoliday-1760463338020-small.png"],
  "Paul George": ["PaulGeorge-new-1733883115697-small.png"],
  "Zach LaVine": ["ZachLavine-Kings-1739547173197-small.png"],
  "DeMar DeRozan": ["DemarDerozan-new-1733883145528-small.png"],
  "Naz Reid": ["NazReid2025-1760455917844-small.png"],
  "Payton Pritchard": ["PaytonPritchard-1733847506582-small.png"],
  "Michael Porter Jr.": ["MichaelPorterJr2025-1760478725133-small.png"],
  "Josh Hart": ["JoshHart2025-1760461110228-small.png"],
  "Christian Braun": ["ChristianBraun-1740596818697-small.png"],
  "Tari Eason": ["TariEason-1732046059748-small.png"],
  "Mitchell Robinson": ["MitchellRobinson2025-1760464611043-small.png"],
  "De'Andre Hunter": ["DeAndreHunter-Cavs-1739547098525-small.png"],
  "Brook Lopez": ["BrookLopez-1729001470243-small.png"],
  "Josh Giddey": ["JoshGiddey-1729001868355-small.png"],
  "Jordan Poole": ["PooleWizards01-1702522152850-small.png"],
  "Jonas Valanciunas": ["JonasValanciunasM-small.png"],
  "Spencer Dinwiddie": ["SpencerDinwiddieM-small.png"],
  "Jalen Duren": ["JalenDuren-1740596855890-small.png"],
  "Toumani Camara": ["ToumaniCamara-1743033122405-small.png"],
  "Brandon Miller": ["BrandonMiller-1760463406889-small.png"],
  "Devin Vassell": ["DevinVassell-1728929265956-small.png"],
  "Jakob Poeltl": ["JakobPoeltl-1733847440855-small.png"],
  "Dillon Brooks": ["DillonBrooks2025-1760478690574-small.png"],
  "Aaron Nesmith": ["AaronNesmith-1748975385908-small.png"],
  "Herb Jones": ["HerbJones-1728924799413-small.png"],
  "Ausar Thompson": ["AusarThompson-1760460955423-small.png"],
  "RJ Barrett": ["RJBarrett-1729035362858-small.png"],
  "CJ McCollum": ["CJMcCollum_MediaDay-1760478709261-small.png"],
  "Cason Wallace": ["CasonWallace-1760462965958-small.png"],
  "Bradley Beal": ["BradleyBeal-1760463097105-small.png"],
  "Anfernee Simons": ["AnferneeSimons2025-1760478633222-small.png"],
  "Jabari Smith Jr.": ["JabariSmith-new-1749580090610-small.png"],
  "T.J. McConnell": ["TJMcConnell-1760462735029-small.png"],
  "Santi Aldama": ["SantiAldama-1760460809741-small.png"],
  "Jaden Ivey": ["JadenIvey-1760464692698-small.png"],
};

/**
 * Converts player name to image filename format (removes spaces and special chars)
 * Example: "Nikola Jokic" -> "NikolaJokic"
 * Example: "Jabari Smith Jr." -> "JabariSmithJr"
 */
function getPlayerImageName(playerName: string): string {
  return playerName
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(/-/g, "")
    .replace(/'/g, "");
}

/**
 * Gets image URLs for a player
 * Returns array of image paths that match the player
 */
export function getPlayerImageUrls(player: Player): string[] {
  if (!player || !player.name) {
    return [];
  }

  // First, try to find exact match in the map (for NBA players)
  const exactMatch = playerImageMap[player.name];
  if (exactMatch && exactMatch.length > 0) {
    // Return paths as-is - browsers handle spaces and special chars in URLs
    return exactMatch.map(filename => `/The NBA, Ranked_files/${filename}`);
  }

  // For Euroleague players, check euroleague folder
  if (player.league === "Euroleague") {
    // Convert player name to filename format
    const imageName = getEuroleagueImageName(player.name);
    const euroleaguePath = `/euroleague/${imageName}.png`;
    return [euroleaguePath];
  }

  // If no exact match, try to find by name pattern
  const imageName = getPlayerImageName(player.name);
  const basePath = "/The NBA, Ranked_files";
  
  // Try common patterns - in a real app, you might want to fetch available files
  // For now, return empty array if no match found
  return [];
}

/**
 * Converts player name to Euroleague image filename format
 * Example: "Moses Wright" -> "MosesWright"
 * Example: "Nigel Williams-Goss" -> "NigelWilliams-Goss"
 * Example: "Isaia Cordinier" -> "isaiaCordinier"
 * Example: "PJ Dozier" -> "PjDozier"
 */
function getEuroleagueImageName(playerName: string): string {
  // Handle reverse special cases
  const reverseSpecialCases: Record<string, string> = {
    "Isaia Cordinier": "isaiaCordinier",
    "PJ Dozier": "PjDozier",
    "Georgios Papagiannis": "GerogiosPapagiannis",
    "Nick Weiler-Babb": "NickWeilerBabb",
    "TJ Shorts": "TJShorts",
    "Codi Miller-McIntyre": "CodiMillerMcIntyre",
    "Nando De Colo": "NandoDeColo",
    "Edy Tavares": "WalterTavares",
    "Sasha Vezenkov": "SasaVezenkov",
    "Antonio Blakeney": "AntonioBlanakey",
  };
  
  if (reverseSpecialCases[playerName]) {
    return reverseSpecialCases[playerName];
  }
  
  return playerName
    .replace(/\s+/g, "") // Remove spaces
    .replace(/([a-z])([A-Z])/g, "$1$2") // Ensure proper camelCase
    .replace(/\./g, ""); // Remove dots
    // Keep hyphens and apostrophes as they are in filenames
}

/**
 * Gets the primary image URL for a player (first available image)
 */
export function getPlayerImageUrl(player: Player): string {
  const urls = getPlayerImageUrls(player);
  return urls.length > 0 ? urls[0] : "";
}
