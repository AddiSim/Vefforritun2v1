import { describe, expect, test } from '@jest/globals';
import { calculateScores, getScores } from './score';

describe('Score Calculation', () => {
  test('should calculate scores correctly', () => {
    const mockGameData = {
      games: [
        {
          home: { name: 'Team A', score: 5 },
          away: { name: 'Team B', score: 4 }
        },
        {
          home: { name: 'Team B', score: 2 },
          away: { name: 'Team A', score: 2 }
        }
      ]
    };

    calculateScores(mockGameData);
    const scores = getScores();

    expect(scores.get('Team A')).toEqual(expect.objectContaining({
      wins: 1,
      draws: 1,
      losses: 0,
      points: 4
    }));

    expect(scores.get('Team B')).toEqual(expect.objectContaining({
      wins: 0,
      draws: 1,
      losses: 1,
      points: 1
    }));
  });
});

