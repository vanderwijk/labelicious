$(function () {

	const RESTURL = 'https://www.labelicious.eu/wp-json/';
	//const RESTURL = 'http://labelicious.local/wp-json/'

	function loadSingleEntry(url) {

		var id = url;
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
	}

	var load = function (url) {
		$.get(url).done(function (data) {
			$("#main-content").html(data);
		})
	};

	$(document).on('click', 'a', function (e) {
		e.preventDefault();

		var $this = $(this),
			url = $this.attr("href"),
			title = $this.text();

		history.pushState({
			url: url,
			title: title
		}, title, url);

		document.title = title;

		loadSingleEntry(url);
	});

	$(window).on('popstate', function (e) {
		var state = e.originalEvent.state;
		if (state !== null) {
			document.title = state.title;
			load(state.url);
		} else {
			url = '/wp-content/themes/enfold-child/app/';
			window.location.reload();
		}
	});
});

jQuery(document).ready(function ($) {

	
});
/*
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
*/
$('#main-content').on('swiperight', '.thumbnail', function(e) {
	e.preventDefault();
	//$(this).parent().next('.category-item-content').toggle();
	//alert( 'swiperight' )
});