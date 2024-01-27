export function parseGameData(fileContents, validTeams) {
  try {
    const data = JSON.parse(fileContents);
    if (!data.date || !Array.isArray(data.games)) {
      console.error('Invalid game day data structure.');
      return null;
    }

    const validGames = data.games.filter(game =>
      validTeams.has(game.home.name) &&
      validTeams.has(game.away.name) &&
      Number.isInteger(game.home.score) && game.home.score >= 0 &&
      Number.isInteger(game.away.score) && game.away.score >= 0
    );

    if (validGames.length === 0) {
      console.error('No valid games found in this file.');
      return null;
    }

    return { ...data, games: validGames };
  } catch (error) {
    console.error('Error parsing game day data:', error);
    return null;
  }
}
