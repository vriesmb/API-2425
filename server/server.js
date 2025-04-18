import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import { JSDOM } from 'jsdom';

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();
const apiKey = process.env.STEAM_API_KEY;

// const gameNr = '730';

// const gameNewsData = await fetch('https://partner.steam-api.com/ISteamNews/GetNewsForAppAuthed/v2/?key=' + apiKey + '&appid=' + gameNr + '&count=3&maxlength=300&format=json');

app
  .use(logger())
  .use('/', sirv(process.env.NODE_ENV === 'development' ? 'client' : 'dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  // HIER GAMES OPHALEN
  const url = `https://api.steampowered.com/IStoreService/GetAppList/v1/?key=${process.env.STEAM_API_KEY}&include_games=true&max_results=10`

  const games = await fetch(url);
  const gamesData = await games.json();
  const enrichedGames = [];

  // console.log({ gamesData })
  for (const gameIndex in await gamesData.response.apps) {
    const appId = gamesData.response.apps[gameIndex].appid;
    const urlGameDeepDetails = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

    const gameDetails = await fetch(urlGameDeepDetails);
    const gameDetailsData = await gameDetails.json();
    // const data = gameDetailsData.data;`
    enrichedGames.push(gameDetailsData[appId].data);
    // console.log({ gameDetailsData })
  }

  // return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', games: gameData }));
  console.log(enrichedGames[0])
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', games: enrichedGames }));
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// app.get('card/:appid', async (req, res) => {
//   const appId = req.params.appid;
//   // url FOR NEWS ITEMS ATTACHED TO A GAME
//   const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appId}&count=12`

//   // urlDetails FOR A GAME WITH SIMPLIFIED GAME DETAILS LIKE TAGS/GENRES
//   const urlDetails = `https://steamspy.com/api.php?request=appdetails&appid=${appId}`;

//   // urlGameDeepDetails FOR A GAME WITH ALL THE DETAILS
//   const urlGameDeepDetails = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

//   const gameDetails = await fetch(urlDetails);
//   const gameDetailsData = await gameDetails.json();

//   const gameNews = await fetch(url);
//   const gameNewsData = await gameNews.json();


//   const gameDeepDetails = await fetch(urlGameDeepDetails);
//   const gameDeepDetailsData = await gameDeepDetails.json();

//   const gameImageLength = gameDeepDetailsData.data.screenshots.length;
//   const screenshots = gameDeepDetailsData.data.screenshots;
//   const randomImage = screenshots[getRandomInt(gameImageLength - 1)];

//   console.log(gameNewsData);
//   console.log(gameDetailsData);
//   console.log(gameDeepDetailsData);

//   return res.send(renderTemplate('server/components/card/card.liquid', { title: 'card item' }));
// });

app.get('game/:appid', async (req, res) => {
  const appId = req.params.appid;

  // url FOR NEWS ITEMS ATTACHED TO A GAME
  const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appId}&count=12`;

  // urlDetails FOR A GAME WITH SIMPLIFIED GAME DETAILS LIKE TAGS/GENRES
  const urlDetails = `https://steamspy.com/api.php?request=appdetails&appid=${appId}`;

  // urlGameDeepDetails FOR A GAME WITH ALL THE DETAILS
  const urlGameDeepDetails = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

  const gameDetails = await fetch(urlDetails);
  const gameDetailsData = await gameDetails.json();

  const gameNews = await fetch(url);
  const gameNewsDataRaw = await gameNews.json();

  const gameDeepDetails = await fetch(urlGameDeepDetails);
  const gameDeepDetailsData = await gameDeepDetails.json();

  const screenshots = gameDeepDetailsData[appId].data.screenshots;
  const gameImageLength = screenshots.length;
  const randomImage = screenshots[getRandomInt(gameImageLength - 1)];

  // ✅ FIX: voeg eerste img toe aan elk nieuwsitem
  const newsItems = gameNewsDataRaw.appnews.newsitems.map(item => {
    let firstImg = null;

    try {
      const dom = new JSDOM(item.contents);
      const img = dom.window.document.querySelector('img');
      if (img) firstImg = img.src;
    } catch (err) {
      console.warn("Fout bij het parsen van afbeelding:", err);
    }

    return {
      ...item,
      firstImg: firstImg
    };
  });

  const gameNewsData = {
    appnews: {
      ...gameNewsDataRaw.appnews,
      newsitems: newsItems
    }
  };

  console.log(gameNewsData);
  console.log(gameDetailsData);
  console.log(gameDeepDetailsData);

  return res.send(renderTemplate('server/views/detail.liquid', {
    title: 'Home',
    gameNewsData: gameNewsData,
    gameDetailsData: gameDetailsData,
    gameDeepDetailsData: gameDeepDetailsData[appId],
    randomImage: randomImage
  }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

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