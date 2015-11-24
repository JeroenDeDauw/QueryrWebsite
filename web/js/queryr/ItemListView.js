( function($, queryr) {
	'use strict';

	queryr.ItemListView = function( listDiv ) {
		this.listDiv = listDiv;
		this.onSelectHandler = function() {};
	};

	$.extend( queryr.ItemListView.prototype, {
		display: function( listFilters ) {
			listFilters = listFilters || {};
			var self = this;

			this._fetchTypes( listFilters, function( items, relativeUrl, fullUrl ) {
				self._displayUrls( relativeUrl, fullUrl );
				self._displayItems( items );
				self._bindClickHandler();
			} );
		},

		onClick: function( clickHandler ) {
			this.onSelectHandler = clickHandler;
		},

		_bindClickHandler: function() {
			var self = this;

			this.listDiv.find( 'a.list-group-item' ).click( function( e ) {
				self._handleClickEvent( e );
			} );
		},

		_handleClickEvent: function( e ) {
			var element = $( e.currentTarget );

			$( 'a.list-group-item' ).removeClass( 'active' );
			element.addClass( 'active' );
			element.blur();

			this.onSelectHandler( {
				'id': element.attr( 'data-id' )
			} );
		},

		_fetchTypes: function( listFilters, onFetched ) {
			var relativeUrl = 'items?per_page=10';

			if ( listFilters.type !== undefined ) {
				relativeUrl = relativeUrl + '&type=' + listFilters.type;
			}

			var fullUrl = queryr.config.api_url + relativeUrl;

			$.get( fullUrl, function( items ) {
				onFetched( items, relativeUrl, fullUrl );
			} );
		},

		_displayItems: function( items ) {
			var $listDiv = this.listDiv.find( 'div.list-group' );
			$listDiv.html( '' );

			var self = this;
			$.each( items, function( index, value ) {
				self._addItemHtml( value, $listDiv );
			} );
		},

		_addItemHtml: function( item, $listDiv ) {
			var $row = $( '<a>' ).attr( {
				'href': "#",
				'class': "list-group-item",
				'data-id': item.id
			} );

			var $header = $( '<h4>' ).text( item.label ).addClass( 'list-group-item-heading' );
			var $content = $( '<p>' ).text( item.id ).addClass( 'list-group-item-text' );

			$listDiv.append( $row.html( $header ).append( $content ) );
		},

		_displayUrls: function( relativeUrl, fullUrl ) {
			this.listDiv.find( 'p.relative-link' ).text( '/' + relativeUrl );
			this.listDiv.find( 'a.full-link' ).attr( 'href', fullUrl );
		}
	} );
}(jQuery, queryr) );