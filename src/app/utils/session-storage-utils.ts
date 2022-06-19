import { Injectable } from '@angular/core';
import { SessionStorage } from '../models/session-storage.enum';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageUtils {

    constructor(private sessionStorageService: SessionStorageService) {
    }

    saveResponseToSessionStorage(response: any) {
        console.log("savesessionstorage", response);

        this.sessionStorageService.save(SessionStorage.token, response.access_token);
        this.sessionStorageService.save(SessionStorage.token_type, response.token_type);
        this.sessionStorageService.save(SessionStorage.refresh_token, response.refresh_token);
        // this.sessionStorageService.save(SessionStorage.roles, JSON.stringify(response.roles));
        this.sessionStorageService.save(SessionStorage.roles, JSON.stringify({}));
        this.sessionStorageService.save(SessionStorage.profile, JSON.stringify({
            id: response.user_id,
            // display_name: response.displayName,
            email: response.email,
            username: response.username
        }));
        return response;
    }
}
