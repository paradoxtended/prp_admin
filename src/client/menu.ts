export function CloseAdminMenu(_?: null, cb?: NuiCb) {
    emitNet('prp_admin:closeMenu');

    SendNUIMessage({
        action: 'closeMenu',
        data: null
    });

    SetNuiFocus(false, false);

    if (cb) cb(1);
};

RegisterNuiCallback('closeMenu', CloseAdminMenu);