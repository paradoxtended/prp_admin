import { onClientCallback } from '@overextended/ox_lib/server';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'node:fs';
import { IsPlayerAllowed } from './utils';

const favoritesPath = `${GetResourcePath(GetCurrentResourceName())}/data/favorites.json`;
let favorites: Record<string, string[]> = {};

on('onResourceStart', async (resource: string) => {
  if (resource !== GetCurrentResourceName()) return;

  await mkdir(`${GetResourcePath(GetCurrentResourceName())}/data`, { recursive: true });

  if (!existsSync(favoritesPath)) {
    await writeFile(favoritesPath, JSON.stringify({}, null, 2));
  }

  favorites = JSON.parse(await readFile(favoritesPath, 'utf8'));
});

function WriteFavorites() {
  writeFile(favoritesPath, JSON.stringify(favorites, null, 2));
}

function FavoriteCommand(playerId: string, commandName: string) {
  if (!favorites[playerId]) {
    favorites[playerId] = [];
  }

  if (!favorites[playerId].includes(commandName)) {
    favorites[playerId].push(commandName);
  } else {
    favorites[playerId] = favorites[playerId].filter((cmd) => cmd !== commandName);
  }

  if (favorites[playerId].length === 0) {
    delete favorites[playerId];
  }

  WriteFavorites();
}

onClientCallback('np-admin:toggleFavoriteCmd', async (playerId: any, commandName: string) => {
  const allowed = IsPlayerAllowed(playerId);

  if (!allowed) return;

  const identifiers = getPlayerIdentifiers(playerId);
  const identifier = identifiers.find((id) => id.includes('steam') || id.includes('fivem'));

  FavoriteCommand(identifier, commandName);
});

onClientCallback('np-admin:getFavoritesCmd', async (playerId: any) => {
  const allowed = IsPlayerAllowed(playerId);

  const identifiers = getPlayerIdentifiers(playerId);
  const identifier = identifiers.find((id) => id.includes('steam') || id.includes('fivem'));

  return allowed ? favorites[identifier] : null;
});