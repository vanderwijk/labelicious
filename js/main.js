jQuery(document).ready(function ($) {

	const RESTURL = 'https://www.labelicious.eu/wp-json/'

	window.addEventListener('hashchange', loadSingleEntry, false);

	if ( window.location.hash ) {
		loadSingleEntry();
	} else {
		var template = $( '#entry-listing-template' ).html();
		var output = $( '#main-content' );
		var result = Mustache.to_html( template );
		output.html( result );
	}

	function loadSingleEntry() {

		var id = window.location.hash.substring(1);
		var api = RESTURL + 'wp/v2/entry/' + id + '?_embed';

		$.ajax({
			url: api,
			dataType: "json",
			beforeSend: function() {
				$('.loading').removeClass('hidden');
			},
			success: function(response) {
				var template = $( '#entry-single-template' ).html();
				var output = $( '#main-content' );
				var result = Mustache.to_html( template, response );
				output.html( result );
			},
			complete: function(data) {
				$(window).scrollTop(0);
				$('.description').hide();
				$('.loading').addClass('hidden');
				next_id = (data.responseJSON.next.id);
				previous_id = (data.responseJSON.previous.id);
			},
			error: function() {
				alert( 'cannot load entry' );
			}
		});
	
	}

	function loadEntries(category = '') {

		var url = RESTURL + 'wp/v2/entry?_embed&per_page=100&filter[orderby]=id&order=asc&entry-category=' + category;

		$.ajax({
			url: url,
			dataType: "json",
			beforeSend: function() {
				$('.loading').removeClass('hidden');
			},
			success: function(response) {
				var posts = {
					posts: response
				}
				var template = $( '#entry-listing-template' ).html();
				var output = $( '#main-content' );
				var result = Mustache.to_html( template, posts );
				output.html( result );
				console.log(response);
			},
			complete: function() {
				$('.description').show();
				$('.loading').addClass('hidden');
			},
			error: function() {
				alert( 'cannot load entries' );
			}
		});
	}

	function loadCategories() {
		var api = RESTURL + 'wp/v2/entry-category'

		$.ajax({
			url: api,
			dataType: "json",
			beforeSend: function() {

			},
			success: function(response) {
				console.log(response);
			},
			complete: function(data) {

			},
			error: function() {
				alert( 'cannot load categories' );
			}
		});

	}

	$('#main-content').on('swipeleft', '.thumbnail', function () {
		location.hash = '#' + next_id;
		loadSingleEntry();
	});

	$('#main-content').on('swiperight', '.thumbnail', function () {
		location.hash = '#' + previous_id;
		loadSingleEntry();
	});

});