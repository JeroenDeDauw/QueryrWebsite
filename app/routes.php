<?php

/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */

use Silex\Application;

/**
 * These variables need to be in scope when this file is included:
 *
 * @var \Silex\Application $app
 */

$pageGetHandler = function ( $page_name ) use ( $app ) {
	return $app['twig']->render(
		'pages/' . $page_name . '.html',
		[
			'page' => $page_name,
			'api_url' => $app['api_url']
		]
	);
};

$app->get( '/', function() use ( $pageGetHandler ) { return $pageGetHandler( 'home' ); } );
$app->get( '/{page_name}', $pageGetHandler )->assert( 'page_name', '(home|docs|demo)' );
$app->get( '/docs/item', function() use ( $pageGetHandler ) { return $pageGetHandler( 'docs/item' ); } );

return $app;