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

app
  .use(logger())
  .use('/', sirv('dist', { dev: false }))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));



app.get('/', async (req, res) => {
  // omdat mijn api niet toegang geef/heeft tot alle games in een keert om te sortern/filteren
  // heb ik een array gemaakt met unreleasedIds
  // dit zijn de unreleased games die ik wil ophalen
  // ik heb deze ids van de unreleased games op steamdb.info
  // zodat de werking van de app in iederge geval duidelijk is
  const unreleasedIds = [
    '2825530',
    '1903340',
    '2078230',
    '2351330',
    '895160',
    '3407390',
    '2253100'
  ]


  // van declan geleerd, lange code naar erg kort en goed in de basis
  // dit doet een fetch naar de unreleased games
  // ik gebruik .map om de array van unreleasedIds te mappen naar een array van promises
  //  een promise is een object dat een waarde kan bevatten die nog niet bekend is
  // ik gebruik Promise.all om alle promises tegelijk op te halen
  // ik return een array van gamesData en unreleasedGameId is de id van de game
  const gamesData = await Promise.all(unreleasedIds.map(async unreleasedGameId => {
    const unreleasedGameDetails = await fetch(`https://store.steampowered.com/api/appdetails?appids=${unreleasedGameId}`);
    const gameResponse = await unreleasedGameDetails.json();

    return gameResponse[unreleasedGameId].data
  }))

  // om op de overiew pagina een random ga te tonen gebruik ik deze math floor methode
  // van mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const featuredGame = gamesData[Math.floor(Math.random() * gamesData.length)];

  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', games: gamesData, highlight: featuredGame }));
  // ik geef hier in de renderTeamplate alle gewenste data mee. de voorste naam die ik geef, kan ik oproepen in de liquid tempalte.
});

// deze gebruik ik op de detailpagina als hero/pagina background
// en de max vervang ik door de gameImageLength - 1 zodat hij niet verder gaat dan dat de array lang is
// mdn random: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}




app.get('game/:appid', async (req, res) => {
  const appId = req.params.appid;

  // url NEWS ITEMS
  const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appId}&count=12`;

  // urlDetails SIMPLIFIED GAME DETAILS zoals TAGS/GENRES
  const urlDetails = `https://steamspy.com/api.php?request=appdetails&appid=${appId}`;

  // tijdelijk header in proberen te zetten om te kijken of dat de Render Online errors zou fixen
  // const headers = {
  //   'Accept': 'application/json'
  // };

  // urlGameDeepDetails ALL DETAILS van een game
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
  // hier roep ik mn functie aan om een random getal te krijgen en deze zet ik dan om naar een random image


  // genres, is een array van objecten, ik moet het mappen naar een array van strings
  // mappen houdt in dat ik een array van objecten heb en ik wil daar een array van strings van maken
  // ik gebruik de map functie om dit te doen, ik haal de description op van elk object in de array
  // ik gebruik || [] om te zorgen dat als er geen genres zijn, ik een lege array krijg
  // vervolgens kan ik het gebruiken in de liquid template
  const gameIdGenres = gameDeepDetailsData[appId].data.genres.map(genre => genre.description) || [];

  console.log("genre log", gameIdGenres);




  // met dezelfde methode die declan me laten zien heeft haal ik hier de game details op
  // ik haal de game details op van de game met de appId die ik heb meegegeven
  // omdat de api die ik gebruik een image heeft verwikkel din de html
  // haal ik de image op met een DOM parser
  // ik gebruik de JSDOM library om de html te parseren
  // ik haal de image op met een querySelector binnen de window van de item.contents DOM
  // en de op te halen .src stop ik dan in de firstImg variabele
  // ik return dan een object met de item en de firstImg 
  // ik sla de firstImg op in de gameNewsData object

  // bronnen:
  // https://github.com/jsdom/jsdom
  // https://www.testim.io/blog/jsdom-a-guide-to-how-to-get-started-and-what-you-can-do/
  // https://blog.logrocket.com/parsing-html-node-js-jsdom/
  // https://bhavyadhiman7.medium.com/crawling-a-websites-html-text-using-jsdom-692d2a87cc31
  // en uiteraard voor het pakken van de eerste image:
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector


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
    randomImage: randomImage,
    gameIdGenres: gameIdGenres
  }));
});






const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};
