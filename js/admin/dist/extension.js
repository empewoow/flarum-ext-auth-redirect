'use strict';

System.register('empewoow/flarum-auth-redirect/components/AuthSettingsModal', ['flarum/components/SettingsModal'], function (_export, _context) {
  "use strict";

  var SettingsModal, AuthSettingsModal;
  return {
    setters: [function (_flarumComponentsSettingsModal) {
      SettingsModal = _flarumComponentsSettingsModal.default;
    }],
    execute: function () {
      AuthSettingsModal = function (_SettingsModal) {
        babelHelpers.inherits(AuthSettingsModal, _SettingsModal);

        function AuthSettingsModal() {
          babelHelpers.classCallCheck(this, AuthSettingsModal);
          return babelHelpers.possibleConstructorReturn(this, (AuthSettingsModal.__proto__ || Object.getPrototypeOf(AuthSettingsModal)).apply(this, arguments));
        }

        babelHelpers.createClass(AuthSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'AuthSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('empewoow-flarum-auth-redirect.admin.auth_settings.title');
          }
        }, {
          key: 'form',
          value: function form() {
            return [m(
              'div',
              { className: 'Form-group' },
              m(
                'label',
                null,
                app.translator.trans('empewoow-flarum-auth-redirect.admin.auth_settings.redirect_url')
              ),
              app.translator.trans('empewoow-flarum-auth-redirect.admin.auth_settings.url_instructions'),
              m('input', { className: 'FormControl', bidi: this.setting('empewoow-flarum-auth-redirect.auth_redirect_url') }),
              m('br', null),
              m(
                'label',
                { className: 'checkbox' },
                m('input', { type: 'checkbox', bidi: this.setting('empewoow-flarum-auth-redirect.auth_disable_login') }),
                app.translator.trans('empewoow-flarum-auth-redirect.admin.auth_settings.disable_login')
              ),
              m('br', null),
              m(
                'label',
                { className: 'checkbox' },
                m('input', { type: 'checkbox', bidi: this.setting('empewoow-flarum-auth-redirect.auth_disable_signup') }),
                app.translator.trans('empewoow-flarum-auth-redirect.admin.auth_settings.disable_signup')
              ),
              m('br', null),
              m(
                'label',
                { className: 'checkbox' },
                m('input', { type: 'checkbox', bidi: this.setting('empewoow-flarum-auth-redirect.auth_disable_change_email') }),
                app.translator.trans('empewoow-flarum-auth-redirect.admin.auth_settings.disable_change_email')
              )
            )];
          }
        }]);
        return AuthSettingsModal;
      }(SettingsModal);

      _export('default', AuthSettingsModal);
    }
  };
});;
'use strict';

System.register('empewoow/flarum-auth-redirect/main', ['flarum/app', 'flarum/extend', 'empewoow/flarum-auth-redirect/components/AuthSettingsModal', 'flarum/components/SessionDropdown', 'flarum/components/LinkButton'], function (_export, _context) {
  "use strict";

  var app, extend, AuthSettingsModal, SessionDropdown, LinkButton;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_empewoowFlarumAuthRedirectComponentsAuthSettingsModal) {
      AuthSettingsModal = _empewoowFlarumAuthRedirectComponentsAuthSettingsModal.default;
    }, function (_flarumComponentsSessionDropdown) {
      SessionDropdown = _flarumComponentsSessionDropdown.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }],
    execute: function () {

      app.initializers.add('empewoow-flarum-auth-redirect', function () {
        console.log('Hello admin :)!');

        // I have no idea why this should be called "empewoow-auth-redirect"...
        app.extensionSettings['empewoow-auth-redirect'] = function () {
          return app.modal.show(new AuthSettingsModal());
        };

        // Change log-out button URL
        extend(SessionDropdown.prototype, 'items', function (items) {
          // If our redirect URL is not empty
          if (app.forum.attribute('auth_redirect_url') != '') {
            // Remove existing button first
            items.remove('logOut');
            // Add our own button
            items.add('logOut', LinkButton.component({
              icon: 'sign-out',
              children: app.translator.trans('core.admin.header.log_out_button'),
              href: app.forum.attribute('auth_redirect_url'),
              config: function config() {}
            }), -100);
          }
        });
      });
    }
  };
});