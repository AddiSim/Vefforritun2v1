export function generateIndexHTML() {
  const html = `
      <!DOCTYPE html>
      <html lang="is">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Insert super title fótboltamót!!</title>
          <link rel="stylesheet" href="../public/styles.css">
      </head>
      <body>
          <header>
            <h1>Insert super title fótboltamót!!</h1>
            <nav>
              <ul>
                <li><a href="leikir.html">Matches</a></li>
                <li><a href="stada.html">Standings</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <h2>Um mótið</h2>
            <p>Þetta er fótboltamót fyrir bjórpabba sem ætla að reyna að sýna flotta takta á vellinum og drekka bjór ofc</p>
          </main>
      </body>
      </html>
  `;
  return html;
}

export function generateLeikirHTML(allGameData) {
  let html = `
      <!DOCTYPE html>
      <html lang="is">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Úrslit leikja</title>
          <link rel="stylesheet" href="../public/styles.css">
      </head>
      <body>
          <h1>Úrslit leikja</h1>
          <section>
  `;

  allGameData.forEach(gameDay => {
      html += `
          <h2>Game Date: ${new Date(gameDay.date).toLocaleDateString()}</h2>
          <ul>
      `;

      gameDay.games.forEach(game => {
          html += `
              <li>${game.home.name} (${game.home.score}) vs. ${game.away.name} (${game.away.score})</li>
          `;
      });

      html += '</ul>';
  });

  html += `
          </section>
          <a href="index.html">Til baka</a>
      </body>
      </html>
  `;
  return html;
}


export function generateStadaHTML(scores) {
  const sortedScores = Array.from(scores).sort((a, b) => b[1].points - a[1].points);

  let html = `
      <!DOCTYPE html>
      <html lang="is">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Staðan</title>
          <link rel="stylesheet" href="../public/styles.css">
      </head>
      <body>
          <h1>Staðan</h1>
          <table>
              <thead>
                  <tr>
                      <th>Lið</th>
                      <th>Stig</th>
                  </tr>
              </thead>
              <tbody>
  `;

  sortedScores.forEach(([team, stats]) => {
      html += `
          <tr>
              <td>${team}</td>
              <td>${stats.points}</td>
          </tr>
      `;
  });

  html += `
              </tbody>
          </table>
          <a href="index.html">Til baka</a>
      </body>
      </html>
  `;
  return html;
}
