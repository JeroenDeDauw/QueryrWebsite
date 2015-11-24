$( document ).ready( function() {
	'use strict';

	$( '.dropdown-toggle' ).dropdown();

	var itemView = new queryr.ItemJsonView( 'itemJsonView' );
	var listView = new queryr.ItemListView( $( '#itemListView' ) );
	var searchBox = new queryr.SearchBox( $( '#searchBox' ) );

	searchBox.onFound( function( item ) {
		itemView.showItem( item );
	} );

	searchBox.onNotFound( function() {
		itemView.displayItem( queryr.config.notFoundItem );
	} );

	listView.onClick( function( itemData ) {
		itemView.displayItem( itemData.id );
	} );

	listView.display();
	searchBox.display();

	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function truncate( str, n ) {
		return str.length > n ? str.substr(0 , n - 1 ) + '...' : str;
	}

	var pageParam = getParameterByName( 'page' );

	if ( pageParam !== '' ) {
		searchBox.search( pageParam );
	}

	var wikipediaSearcher = new queryr.WikipediaSearcher( $( '#wpPageSearch' ) );

	wikipediaSearcher.onSelected( function( value ) {
		searchBox.search( value );
	} );

} );