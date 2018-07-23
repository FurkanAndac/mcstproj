import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeNl);

platformBrowserDynamic().bootstrapModule(AppModule);
