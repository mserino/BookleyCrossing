Template.headerTitle.events({
	'click .js-header-hamburger': function(e) {
		$('.js-header-menu').addClass('open');
		$('.js-header-overlay').addClass('open');
		$(e.target).addClass('hidden');
	}
});