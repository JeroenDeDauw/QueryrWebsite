if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	};
}

( function($, queryr) {
	'use strict';
	queryr.ItemJsonView = function( panelId ) {
		this.panelId = panelId;
		this.itemId = '';
	};

	$.extend( queryr.ItemJsonView.prototype, {
		displayItem: function( itemId ) {
			this.itemId = itemId;

			this._setTitle( 'Loading ' + itemId + '...' );

			var self = this;

			this._fetchItem( function( item ) {
				self.showItem( item );
			} );
		},

		showItem: function( item ) {
			this._setTitle(
				"{0} - {1} ({2})".format(
					item.label || '[no label]',
					item.description || '',
					item.id.wikidata
				)
			);

			var $linkList = $( '<p>' );

			$linkList.append( $( '<a>' ).attr( 'href', 'https://en.wikipedia.org/wiki/' + item.id['en_wikipedia'] ).text( 'View on Wikipedia' ) );
			$linkList.append( ' | ' );
			$linkList.append( $( '<a>' ).attr( 'href', 'https://www.wikidata.org/entity/' + item.id.wikidata ).text( 'View on Wikidata' ) );
			$linkList.append( ' | ' );
			$linkList.append( $( '<a>' ).attr( 'href', queryr.config.api_url + 'items/' + item.id.wikidata ).text( 'View on QueryR' ) );

			this._getBodyElement().html( $linkList ).append( '<pre>' + JSON.stringify( item, null, 4 ) + '</pre>' );
		},

		_setTitle: function( titleText ) {
			$( '#' + this.panelId + ' .panel-title' ).text( titleText );
		},

		_getBodyElement: function() {
			return $( '#' + this.panelId + ' .panel-body' );
		},

		_fetchItem: function( onFetched ) {
			$.get(
				queryr.config.api_url + 'items/' + this.itemId,
				onFetched
			);
		}
	} );
}(jQuery, queryr) );