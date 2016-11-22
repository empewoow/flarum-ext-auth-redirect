import { extend } from 'flarum/extend';
import HeaderSecondary from 'flarum/components/HeaderSecondary';
import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';
import SettingsPage from 'flarum/components/SettingsPage';

// Initialize when app loads
app.initializers.add('empewoow-flarum-auth-redirect', function() {
  console.log('Hi there!');
  extend(HeaderSecondary.prototype, 'items', function(items) {
    if (items.has('session')) {
      console.log('We have a session, do nothing!');
    } else {
      console.log('Does not have a session!');

      // Remove some buttons
      //console.log(app.forum.attribute('auth_disable_login') + ' ' + app.forum.attribute('auth_disable_signup'));
      if (app.forum.attribute('auth_disable_login') == '1') {
        //console.log('Remove log-in button!');
        items.remove('logIn');
      }
      if (app.forum.attribute('auth_disable_signup') == '1') {
        //console.log('Remove sign-up button!');
        items.remove('signUp');
      }

      //console.log(app.forum.attribute('auth_redirect_url')); // Check if it works...

      // If our redirect URL is not empty
      if (app.forum.attribute('auth_redirect_url') != '') {
        // Redirect to our login system!
        window.location = app.forum.attribute('auth_redirect_url');
      }
    }
  });

  // Change log-out button URL
  extend(SessionDropdown.prototype, 'items', function(items){
		// If our log-out URL is not empty
		if (app.forum.attribute('auth_logout_url') != '') {
      // Remove existing button first
      items.remove('logOut');
      // Add our own button
      items.add('logOut',
        LinkButton.component({
            icon: 'sign-out',
            children: app.translator.trans('core.forum.header.log_out_button'),
            href:  app.forum.attribute('auth_logout_url'),
            config: () => {}
          }),
        -100
      );
		}
  });

  // Remove change e-mail functionality
  extend(SettingsPage.prototype, 'accountItems', function(items) {
    if (app.forum.attribute('auth_disable_change_email') == '1') {
      items.remove('changeEmail');
    }
  });
});
