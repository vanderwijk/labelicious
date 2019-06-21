jQuery(document).ready(function ($) {

	const RESTURL = 'https://www.labelicious.eu/wp-json/'

	window.addEventListener('hashchange', loadSingleEntry, false);

	if ( window.location.hash ) {
		loadSingleEntry();
	}

	function loadSingleEntry() {

		if ( window.location.hash ) {

			var id = window.location.hash.substring(1);
			var api = RESTURL + 'wp/v2/entry/' + id + '?_embed'

			$.ajax({
				url: api,
				dataType: "json",
				beforeSend: function() {
					$('.loading').removeClass('hidden');
				},
				success: function(response) {
					var template = $( '#entry-single-template' ).html()
					var output = $( '#main-content' )
					var result = Mustache.to_html( template, response )
					output.html( result )
				},
				complete: function() {
					$(window).scrollTop(0);
					$('.description').hide();
					$('.loading').addClass('hidden');
				},
				error: function() {
					alert( 'cannot load entry' )
				}
			});
		} else {
			var template = $( '#entry-listing-template' ).html()
			var output = $( '#main-content' )
			var result = Mustache.to_html( template )
			output.html( result )
		}
	}

});

/*
jQuery(document).ready(function ($) {

	const RESTURL = 'https://www.labelicious.eu/wp-json/'
	//const RESTURL = 'http://labelicious.local/wp-json/'

	var app = {

		init : function() {
			//this.getSiteData()
			this.loadPosts()
			//this.loadCategories()
			this.loadEvents()
		},

		loadEvents : function() {
			$( '#main-content' ).on( 'click', '.entry', this.loadSingleEntry )
			$( '#main-content' ).on( 'click', '#previous', this.loadSingleEntry )
			$( '#main-content' ).on( 'click', '#back', this.loadPosts )
			$( '#main-content' ).on( 'click', '#next', this.loadSingleEntry )
		},
		
		getSiteData : function() {
			$.get( RESTURL )
				.done( function( response ) {
					$( '.site-title' ).html( response.name )
					$( '.description' ).html( response.description )
				})
				.fail( function() {
					alert( 'failed to call specified URL' )
				}
			)
		},

		loadPosts : function() {

			var url = RESTURL + 'wp/v2/entry?_embed&per_page=1&filter[orderby]=id&order=asc'
				// &entry-category=52
			$.ajax({
				url: url,
				dataType: "json",
				beforeSend: function() {
					$('.loading').removeClass('hidden');
					window.location.hash = '';
				},
				success: function(response) {
					var posts = {
						posts: response
					}
					var template = $( '#entry-listing-template' ).html()
					var output = $( '#main-content' )
					var result = Mustache.to_html( template, posts )
					output.html( result )
				},
				complete: function() {
					$('.description').show();
					$('.loading').addClass('hidden');
				},
				error: function() {
					alert( 'cannot load entries' )
				}
			});
		},

		loadSingleEntry : function() {

			var id = Math.abs( $( this ).data( 'id' ) )
			//var id = document.URL.split('#')[1];

			var url = RESTURL + 'wp/v2/entry/' + id + '?_embed'

			$.ajax({
				url: url,
				dataType: "json",
				beforeSend: function() {
					$('.loading').removeClass('hidden');
					window.location.hash = id;
				},
				success: function(response) {
					var template = $( '#entry-single-template' ).html()
					var output = $( '#main-content' )
					var result = Mustache.to_html( template, response )
					output.html( result )
				},
				complete: function() {
					$(window).scrollTop(0);
					$('.description').hide();
					$('.loading').addClass('hidden');
				},
				error: function() {
					alert( 'cannot load entry' )
				}
			});
		},


		loadCategories : function() {
			var url = RESTURL + 'wp/v2/entry-category'

			$.get( url )
				.done( function( response ) {
					var categories = {
						categories : response
					}

					var template = $( '#blog-categories-template' ).html()
					var output = $( '#categories' )
					var result = Mustache.to_html( template, categories )
					output.append( result )

				})
				.fail( function() {
					alert( 'cannot load categories' )
				})
		}

	}

	app.init();

});

jQuery('.thumbnail').on('swiperight',function(e,data){
	alert('test');
});

*/