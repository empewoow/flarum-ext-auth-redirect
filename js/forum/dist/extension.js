'use strict';

System.register('empewoow/flarum-auth-redirect/main', ['flarum/extend', 'flarum/components/HeaderSecondary', 'flarum/components/SessionDropdown', 'flarum/components/LinkButton', 'flarum/components/SettingsPage'], function (_export, _context) {
  "use strict";

  var extend, HeaderSecondary, SessionDropdown, LinkButton, SettingsPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsHeaderSecondary) {
      HeaderSecondary = _flarumComponentsHeaderSecondary.default;
    }, function (_flarumComponentsSessionDropdown) {
      SessionDropdown = _flarumComponentsSessionDropdown.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }, function (_flarumComponentsSettingsPage) {
      SettingsPage = _flarumComponentsSettingsPage.default;
    }],
    execute: function () {

      // Initialize when app loads
      app.initializers.add('empewoow-flarum-auth-redirect', function () {
        console.log('Hi there!');
        extend(HeaderSecondary.prototype, 'items', function (items) {
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
        extend(SessionDropdown.prototype, 'items', function (items) {
          // If our redirect URL is not empty
          if (app.forum.attribute('auth_redirect_url') != '') {
            // Remove existing button first
            items.remove('logOut');
            // Add our own button
            items.add('logOut', LinkButton.component({
              icon: 'sign-out',
              children: app.translator.trans('core.forum.header.log_out_button'),
              href: app.forum.attribute('auth_redirect_url'),
              config: function config() {}
            }), -100);
          }
        });

        // Remove change e-mail functionality
        extend(SettingsPage.prototype, 'accountItems', function (items) {
          if (app.forum.attribute('auth_disable_change_email') == '1') {
            items.remove('changeEmail');
          }
        });
      });
    }
  };
});