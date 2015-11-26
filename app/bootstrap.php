<?php

/**
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */

use Symfony\Component\HttpFoundation\Response;

$app = new \Silex\Application();

require __DIR__ . '/config/config-default.php';

if ( is_readable( __DIR__ . '/config/config.php' ) ) {
	require __DIR__ . '/config/config.php';
}

$app->register( new Silex\Provider\UrlGeneratorServiceProvider() );
$app->register( new Silex\Provider\ValidatorServiceProvider() );
$app->register( new Silex\Provider\ServiceControllerServiceProvider() );

$app->register(
	new Silex\Provider\TwigServiceProvider(),
	[ 'twig.path' => __DIR__.'/templates' ]
);

$app['twig']->addExtension(
	new Aptoma\Twig\Extension\MarkdownExtension( new \Aptoma\Twig\Extension\MarkdownEngine\MichelfMarkdownEngine() )
);

$app->error( function ( \Exception $e, $code ) use ( $app ) {
	if ( $app['debug'] ) {
		return;
	}

	// 404.html, or 40x.html, or 4xx.html, or error.html
	$templates = [
		'errors/' . $code . '.html',
		'errors/' . substr( $code, 0, 2 ) . 'x.html',
		'errors/' . substr( $code, 0, 1 ) . 'xx.html',
		'errors/default.html',
	];

	return new Response(
		$app['twig']->resolveTemplate( $templates )->render( [ 'code' => $code ] ),
		$code
	);
});

return require __DIR__ . '/routes.php';