( function($, queryr) {
	'use strict';

	function truncate( str, n ) {
		return str.length > n ? str.substr(0 , n - 1 ) + '...' : str;
	}

	queryr.WikipediaSearcher = function( searcher ) {
		this.onSelectedHandler = function() {};

		searcher.typeahead(
			{
				hint: true,
				highlight: true
			},
			{
				displayKey: 'value',
				source: function ( query, callback ) {
					var request = $.ajax( {
						url: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&namespace=0&limit=5&search=' + encodeURIComponent( query ),
						dataType: "jsonp"
					} );

					request.success( function( result ) {
						var suggestions = [];

						$.each( result[1], function( key, suggestion ) {
							suggestions.push( {
								value: suggestion,
								description: truncate( result[2][key], 80 )
							} );
						} ) ;

						callback( suggestions );
					} );
				},
				templates: {
					suggestion: function( suggestion ) {
						var div = $( '<div>' );

						div.html( $( '<p>' ).text( suggestion.value ).attr( 'class', 'suggestion-header' ) );
						div.append( $( '<p>' ).text( suggestion.description ).attr( 'class', 'suggestion-desc' ) );

						return div;
					}
				}
			}
		);

		var self = this;

		searcher.on(
			'typeahead:selected',
			function( event, item ) {
				self.onSelectedHandler( item.value );
			}
		);
	};

	$.extend( queryr.WikipediaSearcher.prototype, {

		onSelected: function( onSelectedHandler ) {
			this.onSelectedHandler = onSelectedHandler;
		}

	} );
}(jQuery, queryr) );