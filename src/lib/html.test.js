import { describe, expect, test } from '@jest/globals';
import { generateIndexHTML, generateLeikirHTML, generateStadaHTML } from './html';


const mockAllGameData = [];
const mockScores = new Map([
  ['Team A', { points: 6 }],
  ['Team B', { points: 3 }]
]);

describe('HTML Generation', () => {
  test('generateIndexHTML generates expected structure', () => {
    const html = generateIndexHTML();
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<h1>Welcome to the Game Day Overview</h1>');
  });

  test('generateLeikirHTML generates expected structure', () => {
    const html = generateLeikirHTML(mockAllGameData);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<h1>Matches Overview</h1>');
  });

  test('generateStadaHTML generates expected structure', () => {
    const html = generateStadaHTML(mockScores);
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<h1>Standings</h1>');
  });
});

