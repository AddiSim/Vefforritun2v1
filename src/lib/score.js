const scores = new Map();

function updateTeamScore(team, teamScore, opponentScore) {
  if (!scores.has(team)) {
    scores.set(team, { wins: 0, draws: 0, losses: 0, points: 0 });
  }
  const teamStats = scores.get(team);

  if (teamScore > opponentScore) {
    teamStats.wins += 1;
    teamStats.points += 3;
  } else if (teamScore === opponentScore) {
    teamStats.draws += 1;
    teamStats.points += 1;
  } else {
    teamStats.losses += 1;
  }
}

export function calculateScores(gameData) {
  for (const game of gameData.games) {
    updateTeamScore(game.home.name, game.home.score, game.away.score);
    updateTeamScore(game.away.name, game.away.score, game.home.score);
  }
}

export function getScores() {
  return scores;
}
