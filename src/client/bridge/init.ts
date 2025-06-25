import { Framework as ESX } from './esx';
import { Framework as QB } from './qb';

let Framework: SharedObjectClient;

if (GetResourceState('es_extended') === 'started') {
    Framework = ESX;
} else if (GetResourceState('qb-core') === 'started') {
    Framework = QB;
};

export default Framework;