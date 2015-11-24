( function($, queryr) {
	'use strict';

	queryr.SearchBox = function( searchBoxDiv ) {
		this.onFoundHandler = function() {};
		this.onNotFoundHandler = function() {};

		this.ui = new queryr.SearchBoxUI( searchBoxDiv );

		var self = this;
		this.ui.onSearch( function( ui ) {
			self._doSearch( ui.getTextFieldValue() );
		} );
	};

	$.extend( queryr.SearchBox.prototype, {
		display: function() {
			this.ui.display();
		},

		search: function( searchText ) {
			this.ui.search( searchText );
		},

		onFound: function( onFoundHandler ) {
			this.onFoundHandler = onFoundHandler;
		},

		onNotFound: function( onNotFoundHandler ) {
			this.onNotFoundHandler = onNotFoundHandler;
		},

		_doSearch: function( searchText ) {
			var regex = new RegExp("^(https?://)?[^/]+/wiki/([^#\\?]+)");
			var matchResult = regex.exec( searchText );

			if ( matchResult === null ) {
				this._doPageSearch( searchText );
			}
			else {
				this._doPageSearch( matchResult[2] );
			}
		},

		_doPageSearch: function( PageName ) {
			var self = this;

			var idRequest = $.ajax( {
				url: 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&props=info&format=json&titles='
					+ encodeURIComponent( PageName ) + '&callback=?',
				dataType: 'json'
			} );

			idRequest.fail( function() {
				console.log('fail');
				self.onNotFoundHandler();
				self.ui.finishSearch();
			} );

			idRequest.success( function( result ) {
				if ( 'entities' in result ) {
					var itemRequest = $.get( queryr.config.api_url + 'items/' + encodeURIComponent( Object.keys( result['entities'] )[0] ) );

					itemRequest.fail( function() {
						self.onNotFoundHandler();
					} );

					itemRequest.success( function( itemResult ) {
						self.onFoundHandler( itemResult );
					} );

					itemRequest.always( function() {
						self.ui.finishSearch();
					} );
				}
				else {
					self.onNotFoundHandler();
					self.ui.finishSearch();
				}
			} );
		}

	} );
}(jQuery, queryr) );