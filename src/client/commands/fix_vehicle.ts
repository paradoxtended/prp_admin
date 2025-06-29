import { cache } from "@overextended/ox_lib/client";

function FixVehicle(cb?: NuiCb) {
    if (cb) cb(1);

    const vehicle = cache.vehicle;

    if (!vehicle || vehicle === 0) return;

    SetVehicleFixed(vehicle);
    SetVehicleDirtLevel(vehicle, 0.0);
}

RegisterNuiCallback('fix_vehicle', FixVehicle)