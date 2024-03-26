import {Drivers, Storage} from '@ionic/storage';

const storage = new Storage({
    name: 'local-storage',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});

export default storage;