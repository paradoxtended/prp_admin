import Framework from "../bridge/init"

function HungerThirstMax(cb?: NuiCb) {
    if (cb) cb(1);

    Framework.setStatus({
        hunger: 1000000,
        thirst: 1000000
    })
};

RegisterNuiCallback('hunger_thirst_max', HungerThirstMax)