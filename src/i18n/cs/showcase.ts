// "See it run" showcase: agent steps + outcome stats. Step/stat numbers stay
// in the component; only the labels live here.
const showcase = {
  title: 'Podívejte se, jak to běží',
  lead:
    'Úloha na porozumění dokumentům od začátku do konce: agent projde jednotlivé kroky a výsledky, které vytvoří, jsou přesně to, co dostanete zpět.',
  barTitle: 'agent · běh',
  steps: [
    'Čte 240 nahraných dokumentů',
    'Staví vektorový index (VoyageAI)',
    'Vyhledává relevantní klauzule',
    'Porovnává je se zdrojem',
    'Píše odpověď se zdroji',
  ],
  stats: [
    'Dokumentů zaindexovaných v tomto běhu',
    'Medián času k odpovědi se zdrojem',
    'Odpovědí dohledatelných zpět ke zdroji',
  ],
};

export default showcase;
