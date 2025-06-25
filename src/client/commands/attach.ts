import lib, { triggerServerCallback } from '@overextended/ox_lib/client';
import locale from '@common/locale';

RegisterNuiCallback('attach', async (player: string, cb: (data: unknown) => void) => {
  cb(1);

  if (!player) return;

  const response = await triggerServerCallback<string>('np-admin:attach', null, player);

  if (response) {
    lib.notify({
      description: locale('notifications.attach', response),
      type: 'inform',
    });
  } else {
    lib.notify({
      description: locale('something_went_wrong'),
      type: 'error',
    });
  }
});
