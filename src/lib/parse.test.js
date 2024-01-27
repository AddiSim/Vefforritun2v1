import { describe, expect, test } from '@jest/globals';
import { parseGameData } from './parse';

const mockValidTeams = new Set(['Team A', 'Team B']);

describe('parseGameData', () => {
  test('should parse valid game data correctly', () => {
    const mockFileContents = JSON.stringify({
      date: '2024-01-22T15:20:53.955Z',
      games: [
        {
          home: { name: 'Team A', score: 5 },
          away: { name: 'Team B', score: 4 }
        }
      ]
    });

    const parsedData = parseGameData(mockFileContents, mockValidTeams);
    expect(parsedData).toEqual(expect.objectContaining({
      date: expect.any(String),
      games: expect.arrayContaining([
        expect.objectContaining({
          home: expect.objectContaining({ name: 'Team A', score: 5 }),
          away: expect.objectContaining({ name: 'Team B', score: 4 })
        })
      ])
    }));
  });

  test('should return null for invalid game data', () => {
    const mockFileContents = JSON.stringify({});
    const parsedData = parseGameData(mockFileContents, mockValidTeams);
    expect(parsedData).toBeNull();
  });
});
