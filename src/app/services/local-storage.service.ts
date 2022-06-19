import { Injectable } from '@angular/core';
import { LocalStorage } from '../models/local-storage.enum';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    save(key: LocalStorage, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: LocalStorage) {
        return localStorage.getItem(key);
    }

    delete(key: LocalStorage) {
        localStorage.removeItem(key);
    }
}
