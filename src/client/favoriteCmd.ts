import { triggerServerCallback } from '@overextended/ox_lib/client';

RegisterNuiCallback('toggleFavoriteCmd', async (commandName: string, cb: (data: unknown) => void) => {
  cb(1);

  const response = await triggerServerCallback('np-admin:toggleFavoriteCmd', null, commandName);

  if (response) {}
});

RegisterNuiCallback('getFavoritesCmd', async (_data: unknown, cb: (data: unknown) => void) => {
  const commands = await triggerServerCallback('np-admin:getFavoritesCmd', null);
  cb(commands);
});
