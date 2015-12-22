<?php

namespace Queryr\Website\Tests;

use Silex\WebTestCase;

class SmokeTest extends WebTestCase {

	public function createApplication() {
		return require __DIR__ . '/../app/bootstrap.php';
	}

	public function testRootIsTwoHundred() {
		$client = $this->createClient();

		$client->request( 'GET', '/' );

		$this->assertSame( 200, $client->getResponse()->getStatusCode() );
	}

	public function testRootHasRestCompliantWebservice() {
		$client = $this->createClient();

		$client->request( 'GET', '/' );

		$this->assertContains( 'REST compliant webservice', $client->getResponse()->getContent() );
	}

	public function testDemoPageHasThisSimpleDemo() {
		$client = $this->createClient();

		$client->request( 'GET', '/demo' );

		$this->assertContains( 'This simple demo', $client->getResponse()->getContent() );
	}

}