( function($, queryr) {
	'use strict';

	queryr.SearchBoxUI = function( searchBoxDiv ) {
		this.button = searchBoxDiv.find( 'button' );
		this.textField = searchBoxDiv.find( 'input' );
		this.onSearchHandler = function() {};
	};

	$.extend( queryr.SearchBoxUI.prototype, {
		display: function() {
			var self = this;

			this.textField.keypress( function( e ) {
				if ( e.which === 13 ) {
					e.preventDefault();
					self._onSearchRequest();
					return false;
				}
			} );

			this.button.click( function() { self._onSearchRequest(); } );
		},

		search: function( searchText ) {
			this.setTextFieldValue( searchText );
			this._onSearchRequest();
		},

		onSearch: function( onSearchHandler ) {
			this.onSearchHandler = onSearchHandler;
		},

		_onSearchRequest: function() {
			var self = this;

			this.button.prop( 'disabled', true );
			this.onSearchHandler( this );
		},

		getTextFieldValue: function() {
			return this.textField.val();
		},

		setTextFieldValue: function( value ) {
			this.textField.val( value );
		},

		setButtonText: function( text ) {
			this.button.text( text );
		},

		finishSearch: function() {
			this.button.prop( 'disabled', false );
		}
	} );
}(jQuery, queryr) );