# API @cmda-minor-web 2024 - 2025

Het web is een geweldige plek en de beschikbare technologieën ervan zijn vandaag de dag krachtiger dan ooit tevoren.
De kracht van het web ligt in het feit dat het een platform is dat voor iedereen beschikbaar is en dat het gebaseerd is
op open standaarden. De technologieën worden ontworpen en gespecificeerd op basis van consensus en zijn niet in handen
van één enkele entiteit.

Desondanks zijn er veel mensen en bedrijven die vinden dat het internet niet voldoet aan hun behoeften. Dit blijkt uit
de pogingen van grote techbedrijven om hun eigen afgesloten ecosystemen te creëren. Ze streven hiermee naar controle over
zowel de gebruikerservaring als de gegenereerde data.

**In dit vier weken durende vak zullen we de kracht van het web ervaren en kijken hoe we (mobiele) web apps kunnen maken die
net zo aantrekkelijk zijn als native mobiele apps. We beginnen met het maken van een server-side gerenderde applicatie
waarbij we geleidelijk de gebruikerservaring verbeteren met relevante beschikbare web API's.**

## Doelen

Na deze cursus zul je:

- In staat zijn om een server-side gerenderde applicatie te maken.
- In staat zijn om een enerverende gebruikerservaring te creëren.
- Een breder begrip hebben van het web en zijn mogelijkheden.

## Opdracht

In dit vak zullen we een van de meest voorkomende app-concepten van vandaag
gebruiken en ontdekken dat we deze kunnen maken met moderne webtechnologie
met als doel om een rijke gebruikerservaring creëeren.

Randvoorwaarden:

- Minimaal een overzichts- en detailpagina
- Gebouwd in TinyHTTP + Liquid
- Minimaal een content API
- Minimaal twee Web API's

Voorbeelden:

- Maak je eigen streamingplatform (Netflix/Spotify).
- Maak je eigen doom-scroll-app (Instagram/TikTok).
- Maak je eigen chatapplicatie (WhatsApp/Signal).
- Een andere app die je zelf leuk vindt...

Voorbeeld content API's die je kan gebruiken:

- [MovieDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/)
- [Spotify API](https://developer.spotify.com/documentation/web-api)
- ...

Voorbeelden van Web API's die je kan gebruiken:

- [Page Transition API voor animaties tusse npagina's](https://developer.mozilla.org/en-US/docs/Web/API/Page_Transitions_API)
- [Web Animations API voor complexe animaties](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Service Worker API voor installable web apps](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Push API voor push notifications](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Server sent events voor realtime functionaliteit](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Web Share API voor sharen van content binnen de context van de gebruiker](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- ...

De lijst is eindeloos, laat je vooral inspireren op de overzichtspagina van [MDN](https://developer.mozilla.org/en-US/docs/Web/API).

## Beoordeling

Je zal beoordeeld worden op basis van je code, creativiteit en je gedocumenteerde proces.

Gegenereerde of overgenomen code van een bron telt niet mee voor de
beoordeling, als je AI gebruikt dien je deze als bron te vermelden, zowel in je
procesverslag als in je code. Wanneer je code substantieel aanpast en eigen maakt
telt deze wel mee voor de beoordeling.
Je moet je voortgang elke vrijdag vastleggen en bespreken.

Om het vak te halen zal je aan de criteria hieronder moeten voldoen. Een hoger cijfer kan je halen door verder te gaan dan de basis.

| Tekortkomingen | Criterium                                                                                                                                                                                                                                 | Verbeteringen |
|:---------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------|
|                | *Project* - Je app werkt en is online beschikbaar.                                                                                                                                                                                        |               |
|                | *Proces* - Je hebt je concept, technologieën, gebruikte API’s en proces duidelijk gedocumenteerd in je README.md.                                                                                                                         |               |
|                | *Functionaliteit* - Je hebt minstens een overzicht en een detailpagina. Hoe meer dynamischer je functionaliteit.hoe beter.                                                                                                                |               |
|                | *Enhancements* - Je laat zien dat je begrijpt hoe het web werkt door meerdere Web API's te gebruiken om een zo aantrekkelijk mogelijke gebruikerservaring neer te zetten. Je gebruikt je eigen creativiteit om iets uniks neer te zetten. |               |
|                | *Bronnen* - Je vermeldt je bronnen zowel in je code als in je documentatie.                                                                                                                                                               |               |

## Planning

| Planning                   | Maandag               | Dinsdag            | Vrijdag                                     |
|----------------------------|-----------------------|--------------------|---------------------------------------------|
| Week 1 - Kickoff & concept | Introductie ne uitleg | Workshops          | Feedback gesprekken                         |
| Week 2 - The baseline      | College + workshops   | Workshops          | Feedback gesprekken                         |
| Week 3 - Enhance           | College + workshops   | Workshops          | Feedback gesprekken(*DONDERDAG*)            |
| Week 4 - Enhance & wrap up | Tweede paasdag        | Individuele vragen | Beoordelingsgesprekken(*DONDERDAG/VRIJDAG*) |

## Bronnen

- [Nodejs.org](https://nodejs.org/en/), voor de installatie van NodeJS op jouw systeem, kies voor NodeJS 22.13.1 Long Term Support. Dit is de meest stabiele versie van NodeJS, welke ondersteund wordt met goede documentatie.
- [VSCode How To Open Terminal](https://www.youtube.com/watch?v=OmQhOnBzg_k), om iemand de terminal te zien openen en gebruiken op Youtube.
- [Introduction to NodeJS](https://nodejs.dev/en/learn/), voor een in depth introductie met de NodeJS ontwikkelomgeving. Let op: dit is best een technisch verhaal. De eerste zes pagina’s zijn interessant.
- Om serverside te kunnen renderen maken we gebruik van [TinyHttp](https://github.com/tinyhttp).
- Voor templating maken we gebruik van [LiquidJS](https://liquidjs.com/).
- [Liquid Filters](https://liquidjs.com/filters/overview.html)
- Voor build tooling(CSS en JS) maken we gebruik [Vite](https://vitejs.dev/).
- [Using the Fetch API @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JSON.parse() @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [Partial commits in GitHub Desktop](https://github.blog/news-insights/product-news/partial-commits-in-github-for-windows/)
- [Committing and reviewing changes to your project in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

### Inrichten ontwikkelomgeving

Navigeer naar nodejs.org en installeer de NodeJS ontwikkelomgeving. Kies voor _NodeJS 22.13.1 with long-term support_, download de benodigde bestanden en doorloop het installatieproces.

Fork daarna [deze repository](https://github.com/cmda-minor-web/API-2425) en *clone* deze op jouw computer.

Open deze repository in Visual Studio Code.

Open de _Terminal_ in Visual Studio Code door de toetscombinatie `` ^` `` (control + `) te gebruiken. Er opent een terminalscherm in de hoofdmap van jouw project.

Voer in de terminal het commando `npm install` uit, door het in te typen en op enter te drukken. Je gebruikt _NPM_, de _NodeJS Package Manager_ om alle _afhankelijkheden_ voor dit project te installeren. NPM is een veelgebruikte package manager in frontend land. Voor dit project gebruiken we _TinyHTTP_ (om een _server_ te maken) en _Liquid_ (om HTML te _renderen_).
- (Optioneel) Na de installatie is de map `node_modules` aangemaakt, en gevuld met allerlei _packages_. Scroll eens door deze map heen; vele honderden *open source* ontwikkelaars hebben de packages die je ziet gebouwd en die mag je gratis gebruiken. Ontwikkelen in NodeJS is *standing on the shoulders of giants*.

Start het voorbeeld project op door in de terminal het commando `npm run dev` uit te voeren. Als het goed is, komt een melding te staan over het opstarten van de server: Application started on http://localhost:3000 — Open deze URL in je browser. Let op: Vite draait op een andere poort dan TinyHTTP, dus je moet de poort van TinyHTTP gebruiken: http://localhost:3000

Als het werkt, zet je je server weer uit door in de terminal de toetscombinatie `^c` (control + c) in te voeren. Deze toetsencombinatie wordt in de terminal gebruikt om de huidige taak te stoppen en *controle* (vandaar de c) terug te krijgen van het programma.

- Optioneel: Volg het [NodeJS ‘Hello World’ voorbeeld](https://medium.com/@mohammedijas/hello-world-in-node-js-b333275ddc89)
- Optioneel, iets technischer: Lees de eerste vijf delen van [Introduction to Node](https://nodejs.dev/en/learn/) als je een meer in-depth introductie wilt met de NodeJS ontwikkelomgeving.

