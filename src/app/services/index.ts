import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './interception/auth.interceptor';

@NgModule({
	providers: [
		AuthService,
		LoaderService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class CoreModule {
}

export * from './loader.service';
