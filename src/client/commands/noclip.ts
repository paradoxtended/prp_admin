import { Vector3 } from "@nativewrappers/common";
import { cache } from "@overextended/ox_lib/client";
import { cloaked } from "./cloak";

export let noclipActive: boolean = false;
let entity: number;
let tick: any;
let cam: any;
let speed: number = 1;
let maxSpeed: number = 16;

function ToggleNoclip(cb?: NuiCb) {
    if (cb) cb(1);

    noclipActive = !noclipActive;

    entity = cache.vehicle ? cache.vehicle : cache.ped;

    if (noclipActive) {
        SetupCam();
        ToggleBehavior(true);

        tick = setTick(() => {
            UpdateCameraRotation();
            UpdateSpeed();
            UpdateMovement();
        })
    } else {
        clearTick(tick);
        tick = null;
        StopNoclip();
    }
}

function SetupCam() {
    const rotation = Vector3.fromArray(GetEntityRotation(entity, 5));
    const coords = Vector3.fromArray(GetEntityCoords(entity, true));

    cam = CreateCameraWithParams('DEFAULT_SCRIPTED_CAMERA', coords.x, coords.y, coords.z, 0.0, 0.0, rotation.z, 75.0, false, 1);
    SetCamActive(cam, true);
    RenderScriptCams(true, true, 300, false, false);
    AttachCamToEntity(cam, entity, 0.0, 0.0, 1.0, true);
}

function ToggleBehavior(state: boolean) {
    const coords = Vector3.fromArray(GetEntityCoords(entity, true));

    RequestCollisionAtCoord(coords.x, coords.y, coords.z);
    FreezeEntityPosition(entity, state);
    SetEntityInvincible(entity, state);
    SetEveryoneIgnorePlayer(cache.playerId, state);
    SetPoliceIgnorePlayer(cache.playerId, state);
    SetEntityAlpha(entity, state ? 0 : cloaked ? 150 : 255, false);

    if (!cloaked) {
        SetEntityCollision(entity, !state, !state);
        SetEntityVisible(entity, !state, !state);
    }

    const vehicle = GetVehiclePedIsIn(entity, false);

    if (vehicle !== 0) {
        SetEntityAlpha(vehicle, state ? 0 : 255, false);
    }
}

function UpdateCameraRotation() {
    const axis = {
        rightX: GetControlNormal(0, 220),
        rightY: GetControlNormal(0, 221)
    };

    const rotation = Vector3.fromArray(GetCamRot(cam, 2));
    const pitchChange = axis.rightY * -5;
    const yawChange = axis.rightX * -10;

    // Clamp X (pitch) between -89 and 89
    let newX = rotation.x + pitchChange;
    newX = Math.max(-89.0, Math.min(89.0, newX));

    // Wrap Z (yaw) between 0 and 360
    let newZ = (rotation.z + yawChange) % 360;
    if (newZ < 0) newZ += 360;

    SetCamRot(cam, newX, rotation.y, newZ, 2);

    // Optional: update heading if needed
    SetEntityHeading(entity, newZ);
}

function IsControlAlwaysPressed(input: number, control: number) {
    return IsControlPressed(input, control) || IsDisabledControlPressed(input, control);
}

function UpdateSpeed() {
    if (IsControlAlwaysPressed(2, 14)) {
        speed = speed - 0.5;
        
        if (speed < 0.5) {
            speed = 0.5
        }
    } else if (IsControlAlwaysPressed(2, 15)) {
        speed = speed + 0.5;

        if (speed > maxSpeed) {
            speed = maxSpeed;
        }
    } else if (IsDisabledControlJustReleased(0, 348)) {
        speed = 1;
    }
}

function UpdateMovement(): void {
    let multi = 1.0;

    if (IsControlPressed(0, 21)) { // Shift
        multi = 2.0;
    } else if (IsControlPressed(0, 19)) { // Alt
        multi = 4.0;
    } else if (IsControlPressed(0, 36)) { // Ctrl
        multi = 0.15;
    }

    const rot = Vector3.fromArray(GetCamRot(cam, 2));
    const camForward = new Vector3(
        -Math.sin(rot.z * Math.PI / 180.0),
        Math.cos(rot.z * Math.PI / 180.0),
        0.0
    );

    const camRight = new Vector3(
        Math.cos(rot.z * Math.PI / 180.0),
        Math.sin(rot.z * Math.PI / 180.0),
        0.0
    );

    const camUp = new Vector3(0.0, 0.0, 1.0);
    let moveDir = new Vector3(0.0, 0.0, 0.0);

    if (IsControlPressed(0, 32)) moveDir = moveDir.add(camForward); // W
    if (IsControlPressed(0, 33)) moveDir = moveDir.subtract(camForward); // S
    if (IsControlPressed(0, 34)) moveDir = moveDir.subtract(camRight); // A
    if (IsControlPressed(0, 35)) moveDir = moveDir.add(camRight); // D
    if (IsControlPressed(0, 44)) moveDir = moveDir.add(camUp); // Q
    if (IsControlPressed(0, 46)) moveDir = moveDir.subtract(camUp); // E

    if (moveDir.Length > 0) {
        moveDir = moveDir.normalize().multiply(speed * multi);

        const currentCoords = Vector3.fromArray(GetEntityCoords(entity, true));
        const newCoords = currentCoords.add(moveDir);

        SetEntityCoordsNoOffset(entity, newCoords.x, newCoords.y, newCoords.z, true, true, true);
    }
}

function StopNoclip() {
    DestoryCam()
    TeleportToGround()
    ToggleBehavior(false)
}

function DestoryCam() {
    SetGameplayCamRelativeHeading(0)
    RenderScriptCams(false, true, 300, true, true)
    DetachEntity(entity, true, true)
    SetCamActive(cam, false)
    DestroyCam(cam, true)
}

function TeleportToGround(): void {
    const coords = GetEntityCoords(entity, true);

    const rayHandle = StartShapeTestRay(
        coords[0], coords[1], coords[2],
        coords[0], coords[1], -10000.0,
        1, // Collision type: world geometry
        entity, // Ignored entity (the player)
        0
    );

    const [_, hit, hitCoords] = GetShapeTestResult(rayHandle);

    if (hit === 1) {
        SetEntityCoords(entity, hitCoords[0], hitCoords[1], hitCoords[2], false, false, false, true);
    } else {
        SetEntityCoords(entity, coords[0], coords[1], coords[2], false, false, false, true);
    }
}

RegisterNuiCallback('noclip', ToggleNoclip)