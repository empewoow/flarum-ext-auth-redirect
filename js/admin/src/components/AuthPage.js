import app from 'flarum/app';
import Page from 'flarum/components/Page';
//import Button from 'flarum/components/Button';

export default class AuthPage extends Page {
  view() {
    return (
      <div className="AuthPage">
        <div className="AuthPage-header">
          <div className="container">
            <p>
              Test...
            </p>
          </div>
        </div>
      </div>
    );
  }
}
