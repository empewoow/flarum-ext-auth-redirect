import app from 'flarum/app';
import { extend } from 'flarum/extend';

import AuthPage from 'empewoow/flarum-auth-redirect/components/AuthPage';

app.initializers.add('empewoow-flarum-auth-redirect', () => {
	console.log("Hello admin :)!");

	app.routes.authSettings = { path: '/auth-settings', component: AuthPage.component() };

	// I have no idea why this should be called "empewoow-auth-redirect"...
  app.extensionSettings['empewoow-auth-redirect'] = () => m.route(app.route('authSettings'));

	console.log("Nojo...");
});
