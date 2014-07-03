//FirstView Component Constructor
function SupporterView() {

	var _ = require('/lib/underscore'), theme = require('/ui/theme'), ui = require('/ui/components');

	//create object instance, a parasitic subclass of Observable
	var self = new ui.Window({
		navBarHidden : true,
		backgroundColor : '#FFF'
	});

	var supporterWebView = Ti.UI.createWebView({
		url : '../content/supporter.html',
		height : 'auto',
		width : 'auto',
		focusable : false,
		touchEnabled : false,
		enableZoomControls : false,
		showScrollbars : false,
		zIndex : 10
	})

	var closeButton = Ti.UI.createButton({
		backgroundImage : '../images/closebutton.png',
		height : 92,
		width : 72,
		top : 0,
		right : 0,
		backgroundSelectedImage : '../images/closebuttonselected.png',
		zIndex : 100
	});
	closeButton.addEventListener('click', function() {
		self.close();
	});

	self.add(closeButton);
	self.add(supporterWebView);

	var closeProcedure = setInterval(function() {
		self.close();
	}, 60000);

	supporterWebView.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 60000);
	});

	self.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 60000);
	});

	return self;
}

module.exports = SupporterView;
