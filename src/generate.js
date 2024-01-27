import { writeFile } from 'fs/promises';
import { createDirIfNotExists, readFile, readFilesFromDir } from './lib/file.js';
import { generateIndexHTML, generateLeikirHTML, generateStadaHTML } from './lib/html.js';
import { parseGameData } from './lib/parse.js';
import { calculateScores, getScores } from './lib/score.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';
const TEAMS_FILE = `${INPUT_DIR}/teams.json`;

async function generate() {
  await createDirIfNotExists(OUTPUT_DIR);

  const teamsFileContent = await readFile(TEAMS_FILE);
  const validTeams = new Set(JSON.parse(teamsFileContent));

  const files = await readFilesFromDir(INPUT_DIR);

  const allGameData = [];
  for await (const file of files) {
    if (!file.includes('gameday')) {
      continue;
    }

    const fileContents = await readFile(file);
    const gameData = parseGameData(fileContents, validTeams);
    if (gameData) {
      allGameData.push(gameData);
      calculateScores(gameData);
    }
  }

  allGameData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const scores = getScores();
  const indexContent = generateIndexHTML();
  const leikirContent = generateLeikirHTML(allGameData);
  const stadaContent = generateStadaHTML(scores);

  await writeFile(`${OUTPUT_DIR}/index.html`, indexContent);
  await writeFile(`${OUTPUT_DIR}/leikir.html`, leikirContent);
  await writeFile(`${OUTPUT_DIR}/stada.html`, stadaContent);

}

generate().catch((error) => {
  console.error('Error during site generation:', error);
});
