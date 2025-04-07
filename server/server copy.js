import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';


// http://api.steampowered.com/<interface name>/<method name>/v<version>/?key=<api key>&format=<format>

// https://api.steampowered.com



// async function getData() {
//   const url = "https://store.steampowered.com/api/appdetails?appids=730";
//   const key = process.env.API_KEY;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getData();





import fetch from "node-fetch"; // Nodig om API-verzoeken te doen (npm install node-fetch)

// ✅ Functie 1: Haalt ALLE games op die op Steam bestaan
async function getAllSteamGames() {
  const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.applist.apps; // Dit is een lijst met alle Steam games (appids + namen)
  } catch (error) {
    console.error("❌ Error fetching game list:", error.message);
    return [];
  }
}

// ✅ Functie 2: Haalt DETAILS op van een specifieke game via appid
async function getGameDetails(appid) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data[appid]?.data || null; // Haalt de juiste game data eruit, of null als er geen data is
  } catch (error) {
    console.error(`❌ Error fetching details for game ${appid}:`, error.message);
    return null;
  }
}

// ✅ Functie 3: Zoekt naar alle unreleased games + optioneel een genre-filter
async function getUnreleasedGames(genreFilter = null) {
  console.log("⏳ Bezig met ophalen van Steam games...");

  // 🔹 Stap 1: Haal ALLE games op
  const allGames = await getAllSteamGames();
  console.log(`🔍 Gevonden ${allGames.length} games op Steam`);

  const unreleasedGames = []; // Hier slaan we de gefilterde games op

  // 🔹 Stap 2: Loop door ALLE games (kan groot zijn, dus misschien later optimaliseren met een limit)
  for (let i = 0; i < allGames.length; i++) {
    const game = allGames[i];

    // Haal de details op van de game
    const details = await getGameDetails(game.appid);
    if (!details) continue; // Sla over als er geen data is

    // 🔍 Stap 3: Check of de game unreleased is
    if (details.release_date?.coming_soon) {

      // 🔎 Stap 4: Als een genre-filter is ingesteld, check of de game dat genre heeft
      if (
        genreFilter &&
        (!details.genres || !details.genres.some(g => g.description === genreFilter))
      ) {
        continue; // Skip deze game als hij niet in de gekozen genre valt
      }

      // ✅ Stap 5: Voeg de game toe aan de lijst van unreleased games
      unreleasedGames.push({
        name: details.name, // Naam van de game
        appid: game.appid, // Steam ID (handig voor links)
        release_date: details.release_date.date, // Datum wanneer de game uitkomt
        genres: details.genres?.map(g => g.description) || [], // Lijst van genres
        header_image: details.header_image, // Cover image van de game
      });

      console.log(`🎮 Toegevoegd: ${details.name} (${details.release_date.date})`);
    }
  }

  console.log(`✅ Gevonden ${unreleasedGames.length} unreleased games!`);
  return unreleasedGames;
}

// 🏗 **Test het script: Haal ALLE unreleased games op (of filter op RPG, Shooter, etc.)**
getUnreleasedGames("RPG").then(games => {
  console.log("📌 Unreleased RPG Games:", games);
});




















const data = {
  'beemdkroon': {
    id: 'beemdkroon',
    name: 'Beemdkroon',
    image: {
      src: 'https://i.pinimg.com/736x/09/0a/9c/090a9c238e1c290bb580a4ebe265134d.jpg',
      alt: 'Beemdkroon',
      width: 695,
      height: 1080,
    }
  },
  'wilde-peen': {
    id: 'wilde-peen',
    name: 'Wilde Peen',
    image: {
      src: 'https://mens-en-gezondheid.infonu.nl/artikel-fotos/tom008/4251914036.jpg',
      alt: 'Wilde Peen',
      width: 418,
      height: 600,
    }
  }
}

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: Object.values(data) }));
});

app.get('/plant/:id/', async (req, res) => {
  const id = req.params.id;
  const item = data[id];
  if (!item) {
    return res.status(404).send('Not found');
  }
  return res.send(renderTemplate('server/views/detail.liquid', { title: `Detail page for ${id}`, item }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

