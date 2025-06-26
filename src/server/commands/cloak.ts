import { cache } from "@overextended/ox_lib/server";
import { IsPlayerAllowed } from "../utils";

onNet(`${cache.resource}:cloak`, (state: boolean) => {
    const allowed = IsPlayerAllowed(source);

    if (!allowed) return;

    emitNet(`${cache.resource}:cloak`, -1, source, state);
});