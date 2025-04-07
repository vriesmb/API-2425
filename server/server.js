import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';


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
  // const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${gameNr}&count=3`
  // const gameNews = await fetch(url);
  // const gameNewsData = await gameNews.json();
  // console.log(gameNewsData);

  // return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', games: gameData }));
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home' }));
});

app.get('game/:appid', async (req, res) => {
  const appId = req.params.appid;
  // url FOR NEWS ITEMS ATTACHED TO A GAME
  const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appId}&count=12`

  // urlDetails FOR A GAME WITH SIMPLIFIED GAME DETAILS LIKE TAGS/GENRES
  const urlDetails = `https://steamspy.com/api.php?request=appdetails&appid=${appId}`;

  // urlGameDeepDetails FOR A GAME WITH ALL THE DETAILS
  const urlGameDeepDetails = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

  const gameDetails = await fetch(urlDetails);
  const gameDetailsData = await gameDetails.json();

  const gameNews = await fetch(url);
  const gameNewsData = await gameNews.json();

  const gameDeepDetails = await fetch(urlGameDeepDetails);
  const gameDeepDetailsData = await gameDeepDetails.json();

  console.log(gameNewsData);
  console.log(gameDetailsData);
  console.log(gameDeepDetailsData);

  return res.send(renderTemplate('server/views/detail.liquid', { title: 'Home', gameNewsData: gameNewsData, gameDetailsData: gameDetailsData, gameDeepDetailsData: gameDeepDetailsData[appId] }));
}
);


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