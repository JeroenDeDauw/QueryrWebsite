<?php

/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */

declare(strict_types=1);

use Silex\Application;

/**
 * These variables need to be in scope when this file is included:
 *
 * @var \Silex\Application $app
 */

$app->get( '/', function () use ( $app ) {
	return $app['twig']->render( 'pages/index.html', [ 'page' => 'home' ] );
} );

return $app;