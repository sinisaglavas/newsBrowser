### Webpack instalacija
* -> cini kod sigurnijim i tezim za citanje
* Prva komanda: npm init
* Instaliranje webpack -> npm install --save-dev webpack
* WEBPACK je kombinacija vise najboljih paketa koji postoje i MNOGO se olaksavaju stvari
* WEBPACK nije sam po sebi paket, on je vise okruzenje u kome cemo raditi
* Postoje alternative ali generalno se preporucuje webpack jer ima sve sto nam treba
*
* Instaliracemo jos webpack-cli: npm install --save-dev webpack-cli (cli -> command line interface)
* U prevodu mozemo u terminalu kucati komande koje su striktno vezane za webpack
*
* Zatim kreiramo u korenu projekta konfiguracioni fajl webpack.config.js
* Ovaj fajl uvek isto izgleda (idi na: webpack.config.js)
* Dodati ovaj deo koda u package.json:
   -  "scripts": {
   -  "test": "echo \"Error: no test specified\" && exit 1",
   -  "build": "webpack",
   -  "watch": "webpack --watch"
   - },
* Zatim pokrenuti komandu: npm run build
* Da bismo pratili izvrsavanje koda: npm run watch

### Axios instalacija
- Komanda u terminalu: npm install --save-dev axios
- Svrha axios-a je da na jednostavniji nacin pozivamo API
  - Unutar src/script.mjs unesemo: import axios from 'axios'
  - na ovaj nacin smo uvezli axios iz axios biblioteke
  - poenta webpack-a je da uzme import axios from 'axios', pronađe paket iz node_modules, i spakuje sve u izlazni fajl koji browser učitava
  - sledeci korak je (url je slucajan): axios.get('https://dummyjson.com/products');
  - u index.html: script src="/dist/script.min.js" script
  - po webpack konfiguraciji, izlaz (bundle) ide u: dist/script.min.js
- Kroz jednu liniju koda dobijamo podatke i mnogo su detaljniji podaci
- Mnogo se brze radi i lakse se hendluju greske kroz AXIOS (nasuprot FETCH za koji treba vise koda i vremena)
- Kod AXIOS-a je drugaciji nacin kojim mozemo da izgradimo varijablu response gde se parametri prosledjuju kao objekat:
  - const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
    params: {
    key: apiKey,
    q: location,
    aqi: 'no',
    }
    });

### Pocinjemo projekat sa sajtom za vremensku prognozu 'weatherapi.com'
- Koristicemo njihov api
- Idemo na signUp da napravimo nalog -> moramo kreirati nalog
---
Najvažnija stvar kod webpack + .env

Ovde treba da obratiš pažnju: process.env.GUARDIAN_API_KEY neće raditi sam od sebe u browser JS projektu, osim ako si u webpack-u namestio da se env promenljive ubace kroz DefinePlugin ili koristiš dotenv-webpack.
To je veoma bitno.

- Najčešća opcija: dotenv-webpack

- Ako ga nemaš, instalacija:
- npm install dotenv-webpack --save-dev 
---
BONUS: ako hoćeš live search (bez dugmeta)

Ako želiš da se poziva dok korisnik kuca:
- input.addEventListener('input', async () => {
  const query = input.value.trim();

  if (query.length < 3) return;

  const data = await getArticle(query);
  console.log(data);
  });