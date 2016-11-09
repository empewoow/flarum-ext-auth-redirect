import app from 'flarum/app';
import { extend } from 'flarum/extend';

import AuthPage from 'empewoow/flarum-auth-redirect/components/AuthPage';
import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';


app.initializers.add('empewoow-flarum-auth-redirect', () => {
	console.log("Hello admin :)!");

	app.routes.authSettings = { path: '/auth-settings', component: AuthPage.component() };

	// I have no idea why this should be called "empewoow-auth-redirect"...
	app.extensionSettings['empewoow-auth-redirect'] = () => m.route(app.route('authSettings'));

	console.log("Nojo...");

	// Change log-out button URL
  extend(SessionDropdown.prototype, 'items', function(items){
    // Remove existing button first
    items.remove('logOut');
    // Add our own button
    items.add('logOut',
      LinkButton.component({
          icon: 'sign-out',
          children: app.translator.trans('core.admin.header.log_out_button'),
          href: 'http://localhost/login',
          config: () => {}
        }),
      -100
    );
  });
});
