import { cache } from "@overextended/ox_lib/client";

let cloaked: boolean = false;

RegisterNuiCallback('cloak', (_data: unknown, cb?: NuiCb) => {
    if (cb) cb(1);

    cloaked = !cloaked;

    ClearPedBloodDamage(cache.ped);
    SetPedCanBeTargetted(cache.ped, !cloaked);
    SetPedCanRagdoll(cache.ped, !cloaked)
    SetPedCanRagdollFromPlayerImpact(cache.ped, !cloaked)
    SetPedRagdollOnCollision(cache.ped, !cloaked)

    SetEntityVisible(cache.ped, !cloaked, false);
    SetEveryoneIgnorePlayer(PlayerId(), cloaked);
    SetPoliceIgnorePlayer(PlayerId(), cloaked);
    SetEntityInvincible(cache.ped, cloaked);
});

setTick(() => {
    if (cloaked) {
        SetEntityLocallyVisible(cache.ped);
        SetEntityAlpha(cache.ped, 155, false);
    } else 
        ResetEntityAlpha(cache.ped)
});