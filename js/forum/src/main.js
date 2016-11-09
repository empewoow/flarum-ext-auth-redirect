import { extend } from 'flarum/extend';
import HeaderSecondary from 'flarum/components/HeaderSecondary';
import SessionDropdown from 'flarum/components/SessionDropdown';
//import LogInButtons from 'flarum/components/LoginButtons';
import LinkButton from 'flarum/components/LinkButton';
import SettingsPage from 'flarum/components/SettingsPage';
//import LogInModal from 'flarum/components/LogInModal';
//import ChangePasswordModal from 'flarum/components/ChangePasswordModal'

// Initialize when app loads
app.initializers.add('empewoow-flarum-auth-redirect', function() {
  console.log("Hi there!");
  extend(HeaderSecondary.prototype, 'items', function(items) {
    if (items.has('session')) {
      console.log('We have a session! Do nothing!');
    } else {
      console.log('Does not have a session! Redirect now!');

      // Remove some buttons
      //items.remove('logIn');
      items.remove('signUp');

      // Redirect to our login system!
      //window.location = 'http://localhost/login';
    }
  });

  // Change log-out button url
  extend(SessionDropdown.prototype, 'items', function(items){
    // Remove existing button first
    items.remove('logOut');
    // Add our own button
    items.add('logOut',
      LinkButton.component({
          icon: 'sign-out',
          children: app.translator.trans('core.forum.header.log_out_button'),
          href: app.forum.attribute('baseUrl') + '/login',
          config: () => {}
        }),
      -100
    );
  });

  // Remove change e-mail functionality
  extend(SettingsPage.prototype, 'accountItems', function(items) {
    items.remove('changeEmail');
  });

  // LogInModal.prototype.content = function () {
  //   return [
  //     <div className="Modal-body">
  //       <div className="Form Form--centered">
  //         <a className="btn btn-primary" href="http://localhost/auth/login">Login with Cosmoquest</a>
  //       </div>
  //      </div>
  //     <div className="Modal-footer">
  //       <p className="LogInModal-forgotPassword">
  //       <a className="btn" href="http://localhost/password/reset">Forgot Password?</a>
  //       </p>
  //       <p className="LogInModal-signUp">
  //         <a className="btn" href="http://localhost/auth/register">Register with Cosmoquest</a>
  //       </p>
  //     </div>
  //   ];
  // }

  // ChangePasswordModal.prototype.content = function() {
  //   return (
  //     <div className="Modal-body">
  //       <div className="Form Form--centered">
  //         <p className="helpText">Change your passsword :D!</p>
  //         <div className="Form-group">
  //           <a href="/password/reset" class='Button Button--primary Button--block'>Click here to change your password :D!</a>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

});
