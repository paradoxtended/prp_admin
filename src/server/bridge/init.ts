import { Framework as ESX } from './esx';

let Framework: SharedObjectServer;

if (GetResourceState('es_extended') === 'started') {
    Framework = ESX
} else if (GetResourceState('qb-core') === 'started') {
    // todo
};

export default Framework;