/**
 * Created by stefania on 10/3/16.
 */
import './polyfills.ts';
//import './vendors.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);