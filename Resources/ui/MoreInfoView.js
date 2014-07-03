function MoreInfoView() {

	var _ = require('/lib/underscore'), theme = require('/ui/theme'), ui = require('/ui/components');

	var MasterView = require('/MoreInfoMasterView'), DetailView = require('/MoreInfoDetailView');

	var masterView = new MasterView(), detailView = new DetailView();

	var closeProcedure = setInterval(function() {
		self.close();
	}, 180000);

	masterView.borderColor = '#000';
	masterView.borderWidth = 1;

	var self = new ui.Window({
		navBarHidden : true,
		backgroundColor : '#AAB02D'
	});

	//create master view container
	var masterContainer = Ti.UI.createView({
		top : 0,
		bottom : 0,
		right : 0,
		width : 213,
	});
	masterContainer.add(masterView);
	self.add(masterContainer);

	var closeButton = Ti.UI.createButton({
		backgroundImage : '../images/closebutton.png',
		height : 92,
		width : 72,
		top : 0,
		right : 0,
		backgroundSelectedImage : '../images/closebuttonselected.png'
	});

	closeButton.addEventListener('click', function() {
		self.close();
	});

	masterContainer.add(closeButton);

	var detailContainer = Ti.UI.createView({
		top : 0,
		bottom : 0,
		left : 0,
		width : 1067
	});
	detailContainer.add(detailView);
	self.add(detailContainer);

	masterView.addEventListener('itemSelected', function(e) {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);
		detailView.fireEvent('itemSelected', e);
	});

	var ImageView = new ui.ImageView('../images/logo.png', {
		height : 'auto',
		width : 'auto',
		bottom : 35,
	});

	masterView.add(ImageView);

	masterView.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);
	});

	detailView.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);

	});

	return self;
}

module.exports = MoreInfoView;
