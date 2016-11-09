<?php

namespace Empewoow\AuthRedirect\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Event\PrepareApiAttributes;
use Flarum\Settings\SettingsRepositoryInterface;

class AddAuthAttribute {
  /**
   * @var SettingsRepositoryInterface
   */
  protected $settings;

  /**
   * @param SettingsRepositoryInterface $settings
   */
  public function __construct(SettingsRepositoryInterface $settings) {
    $this->settings = $settings;
  }

  /**
   * @param Dispatcher $events
   */
  public function subscribe(Dispatcher $events) {
  	$events->listen(PrepareApiAttributes::class, [$this, 'prepareApiAttributes']);
  }

  public function prepareApiAttributes(PrepareApiAttributes $event) {
    if ($event->isSerializer(ForumSerializer::class)) {
      $event->attributes['auth_redirect_url'] = $this->settings->get('empewoow-flarum-auth-redirect.auth_redirect_url');
      //$event->attributes['logo_css'] = $this->settings->get('santiagobiali-logo.logo_css');
    }
  }
}
