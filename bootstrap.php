<?php Namespace Empewoow\AuthRedirect;

use Flarum\Event\ConfigureClientView;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
  $events->listen(ConfigureClientView::class, function (ConfigureClientView $event) {
    if ($event->isForum()) {
      $event->addAssets(__DIR__.'/js/forum/dist/extension.js');
      $event->addBootstrapper('empewoow/flarum-auth-redirect/main');
    }
    if ($event->isAdmin()) {
      $event->addAssets(__DIR__.'/js/admin/dist/extension.js');
      $event->addBootstrapper('empewoow/flarum-auth-redirect/main');
    }
  });
};
