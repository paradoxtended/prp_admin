import { cache } from "@overextended/ox_lib/client";

export let cloaked: boolean = false;
let timer: number;

RegisterNuiCallback('cloak', (_data: unknown, cb?: NuiCb) => {
    if (cb) cb(1);

    cloaked = !cloaked;

    if (timer) clearTick(timer);
    
    if (cloaked) {
        timer = setTick(() => SetEntityLocallyVisible(cache.ped));
    };

    ClearPedBloodDamage(cache.ped);
    SetPedCanBeTargetted(cache.ped, !cloaked);
    SetPedCanRagdoll(cache.ped, !cloaked)
    SetPedCanRagdollFromPlayerImpact(cache.ped, !cloaked)
    SetPedRagdollOnCollision(cache.ped, !cloaked)

    SetEntityVisible(cache.ped, !cloaked, false);
    SetEveryoneIgnorePlayer(PlayerId(), cloaked);
    SetPoliceIgnorePlayer(PlayerId(), cloaked);
    SetEntityInvincible(cache.ped, cloaked);
    SetEntityAlpha(cache.ped, cloaked ? 150 : 255, false);

    emitNet(`${cache.resource}:cloak`, cloaked);
});

onNet(`${cache.resource}:cloak`, (adminId: number, state: boolean) => {
    const admin = GetPlayerFromServerId(adminId);
    const ped = GetPlayerPed(admin);

    const localPlayer = cache.ped === ped;

    if (!localPlayer)
        SetEntityCollision(ped, !state, !state);
});