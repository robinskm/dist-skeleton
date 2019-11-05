var $ = $ || window.$;

window.SpeedBump = (function () {
	'use strict';
	return {
		init: function () {
			$('a[target="_blank"]').each(function () {
				$(this).prepend().html($(this).html() + '<span class="reader">Opens a new window</span>');
				$(this).addClass('ext-link');
			});
			$('.ext-link').on('click', function (e) {
				var url = $(this).attr('data-href');
				var target = $(this).attr('target');
				$('#speedbump .speedbump-continue').attr('href', url);
				$('#speedbump .speedbump-continue').attr('target', target);
				// invert the logic ;) (prevent on Cancel)
				// if (!window.confirm("This link will open in a new tab. Would you like to continue?")) {
				// 	e.preventDefault();
				// }
			});

			$('#speedbump .speedbump-continue').on('click', function(){
				$.fancybox.close();
			});
		}
	};
}());

$(document).ready(function () {
	'use strict';
	window.SpeedBump.init();
});