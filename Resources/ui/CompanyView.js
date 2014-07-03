function CompanyView(companyData) {

	var _ = require('/lib/underscore'), theme = require('/ui/theme'), ui = require('/ui/components');

	//create object instance, a parasitic subclass of Observable
	var self = new ui.Window({
		navBarHidden : true,
		backgroundColor : '#FFF',
	});

	/*
	 * Coluna direita.
	 */

	var rightView = Ti.UI.createView({
		top : 0,
		right : 0,
		width : 213,
		backgroundColor : '#fff'
	});

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

	var boxDescriptionView = Ti.UI.createView({
		top : 141,
		right : 0,
		width : 'auto',
		height : 250,
		backgroundColor : '#fff'
	});

	var moldureView = Ti.UI.createView({
		top : 0,
		height : 191,
		width : 216,
		backgroundColor : 'transparent',
		borderColor : '#fff',
		borderWidth : 4,
		zIndex : 100
	});

	var logoImg = new ui.ImageView(companyData.logo, {
		height : 'auto',
		width : 'auto',
		top : 0,
		zIndex : 10
	});

	var descriptionLabel = Ti.UI.createLabel({
		html : companyData.description,
		top : 150,
		left : 10,
		right : 10,
		color : '#000'
	});

	var ImageView = new ui.ImageView('../images/logo.png', {
		height : 'auto',
		width : 'auto',
		bottom : 35,
	});

	rightView.add(closeButton);

	boxDescriptionView.add(moldureView);
	boxDescriptionView.add(logoImg);
	boxDescriptionView.add(descriptionLabel);
	rightView.add(boxDescriptionView);
	rightView.add(ImageView);

	self.add(rightView);

	/*
	 * Coluna Esquerda. Portifolio.
	 */

	var views = [];

	for (var companyImage in companyData.works) {
		var item = companyData.works[companyImage];

		var logoImg = new ui.ImageView(item, {
			height : 'auto',
			width : 'auto',
		});

		views.push(logoImg);
	}

	var worksScroller = Ti.UI.createScrollableView({
		left : 0,
		width : 1067,
		height : 755,
		views : views,
		showPagingControl : false
	});

	self.add(worksScroller);

	var closeProcedure = setInterval(function() {
		self.close();
	}, 60000);

	rightView.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 60000);
	});

	worksScroller.addEventListener('scroll', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 60000);
	});

	return self;
}

module.exports = CompanyView;
