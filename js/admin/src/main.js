import app from 'flarum/app';
import { extend } from 'flarum/extend';

import AuthSettingsModal from 'empewoow/flarum-auth-redirect/components/AuthSettingsModal';
import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';


app.initializers.add('empewoow-flarum-auth-redirect', () => {
	console.log("Hello admin :)!");

	// I have no idea why this should be called "empewoow-auth-redirect"...
	app.extensionSettings['empewoow-auth-redirect'] = () => app.modal.show(new AuthSettingsModal());

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
