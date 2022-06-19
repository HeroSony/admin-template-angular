import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    isLoading = false;
    loadingEventEmitter: EventEmitter<boolean> = new EventEmitter();
    counter = 0;

    constructor() {
    }

    setLoading(isLoading: boolean) {
        if (isLoading) {
            this.counter++;
        } else {
            this.counter = this.counter - 1 < 0 ? 0 : this.counter - 1;
        }
        this.isLoading = this.counter > 0;
        this.loadingEventEmitter.emit(this.isLoading);
    }

    forceStop() {
        this.counter = 0;
        this.isLoading = false;
        this.loadingEventEmitter.emit(this.isLoading);
    }

}
