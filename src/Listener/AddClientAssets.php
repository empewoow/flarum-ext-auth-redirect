<?php

namespace Empewoow\AuthRedirect\Listener;

use DirectoryIterator;
use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Core\User;

class AddClientAssets {
  /**
   * @param Dispatcher $events
   */
  public function subscribe(Dispatcher $events) {
    $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
    //$events->listen(ConfigureClientView::class, [$this, 'myTest']);

    $events->listen(ConfigureClientView::class, function () {
      echo date("d-m-Y H:i:s");
    });

    /*$events->listen(ConfigureClientView::class, function (User $user) {
      if ($user->isGuest()) {
        echo "User is a guest!";
      }
    });*/

    $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
  }
  /**
   * @param ConfigureClientView $event
   */
  public function addAssets(ConfigureClientView $event) {
    if ($event->isForum()) {
      $event->addAssets(__DIR__.'/../../js/forum/dist/extension.js');
      $event->addBootstrapper('empewoow/flarum-auth-redirect/main');
    }
    if ($event->isAdmin()) {
      echo "We are admin!";
      $event->addAssets(__DIR__.'/../../js/admin/dist/extension.js');
      $event->addBootstrapper('empewoow/flarum-auth-redirect/main');
    }
  }
  /**
   * @param User $user
   */
  public function myTest(User $user) {
    echo $user->isGuest();
  }
  /**
   * Provides i18n files.
   *
   * @param ConfigureLocales $event
   */
  public function addLocales(ConfigureLocales $event) {
    foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
      if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
        $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
      }
    }
  }
}
