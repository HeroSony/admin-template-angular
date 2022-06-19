import { Injectable } from '@angular/core';
import { SessionStorage } from '../models/session-storage.enum';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    constructor() {
    }

    save(key: SessionStorage, value: string) {
        sessionStorage.setItem(key, value);
    }

    get(key: SessionStorage) {
        return sessionStorage.getItem(key);
    }

    delete(key: SessionStorage) {
        sessionStorage.removeItem(key);
    }


}
