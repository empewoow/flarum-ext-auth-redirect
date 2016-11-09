## Introduction

This plugin removes sign-up and normal login methods. You can change the behavior of the logout URL through the admin panel. Also when a user is not logged in, the plugin will redirect the user to this desired URL.

Please note that this plugin is still a work in progress.

## During development

Run in (js/forum):

```
npm install

gulp watch
```

When it is compiled, run in Flarum root:

```
composer update
```

Also, whenever you changed the source code, run `php flarum cache:clear` and reload the page.
