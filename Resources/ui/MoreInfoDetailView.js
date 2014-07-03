function MoreInfoDetailView() {
	var self = Ti.UI.createView();

	var contentWebView = Ti.UI.createWebView({
		height : 'auto',
		width : 'auto',
		url : '../content/company.html',
		focusable : false,
		touchEnabled : false,
		enableZoomControls : false,
		showScrollbars : false,
	});
	self.add(contentWebView);

	self.addEventListener('itemSelected', function(e) {
		contentWebView.setUrl(e.url);
	});

	return self;
};

module.exports = MoreInfoDetailView;
