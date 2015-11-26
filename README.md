# QueryR website

Website that documents the [QueryR API](https://github.com/JeroenDeDauw/QueryrAPI).

The website uses the [Silex](silex.sensiolabs.org/) PHP micro-framework.

## Installation

* Run `composer install`
* http://silex.sensiolabs.org/doc/web_servers.html

For developing, you can simply run `php -S localhost:8000` in `web`. No need to have a real server
set up.

## Configuration

Available options are in `app/config/default-config.php`. Create a `app/config/config.php` file
and override the options you are interested in.