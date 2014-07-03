function HomeView() {
	var _ = require('/lib/underscore'), theme = require('/ui/theme'), ui = require('/ui/components'), companiesContent = require('/content/companies'), supportersContent = require('/content/supporters');

	//create object instance, a parasitic subclass of Observable
	var self = new ui.View({top: '140px' });

	// Botão para a tela de cadastro
	var registerButton = new ui.ImageView('../images/registerbutton.png', {
		height : 'auto',
		width : 'auto',
	});

	registerButton.addEventListener('click', function(e) {
		Ti.App.fireEvent('goToRegistrationView');
	});

	// Botão para a tela de 'Saiba Mais'
	var moreInfoButton = new ui.ImageView('../images/moreinfo.png', {
		height : 'auto',
		width : 'auto',
	});

	moreInfoButton.addEventListener('click', function(e) {
		Ti.App.fireEvent('goToMoreInfoView');
	});

	// Botão para abrir a view 'Apoiadores'
	var supportersData = supportersContent.Supporters();

	images = [];

	for (var supporters in supportersData) {
		images.push(supportersData[supporters].logo);
	}

	var supportersImageView = Ti.UI.createImageView({
		images : images,
		height : 151,
		width : 182,
		duration : 3000,
	});

	supportersImageView.start();

	supportersImageView.addEventListener('click', function(e) {
		Ti.App.fireEvent('goToSupporterView');
	});

	var companiesData = companiesContent.Companies();

	// Adiciona as views no grid.
	obj = [];

	for (var companies in companiesData) {
		var item = companiesData[companies];

		switch (item.id) {
			case 1:
				obj.push(Ti.UI.createImageView({
					image : '../images/companies/branco.png',
					height : 'auto',
					width : 'auto',
				}));
				break;
			case 6:
				obj.push(Ti.UI.createImageView({
					image : '../images/companies/branco.png',
					height : 'auto',
					width : 'auto',
				}));
				break;
			case 9:
				obj.push(registerButton);
				break;
			case 11:
				obj.push(moreInfoButton);
				break;
			case 12:
				obj.push(Ti.UI.createImageView({
					image : '../images/companies/branco.png',
					height : 'auto',
					width : 'auto',
				}));
				break;
			case 13:
				obj.push(Ti.UI.createImageView({
					image : '../images/companies/branco.png',
					height : 'auto',
					width : 'auto',
				}));
				break;
			case 14:
				obj.push(Ti.UI.createImageView({
					image : '../images/companies/branco.png',
					height : 'auto',
					width : 'auto',
				}));
				break;	
			case 15:
				var orb = Ti.UI.createImageView({
					image : '../images/companies/branco.png',
					height : 'auto',
					width : 'auto',
				});


				obj.push(orb);
				break;
			default:
				var logoButton = new ui.ImageView(item.logo, {
					data : item,
					height : 'auto',
					width : 'auto',
				});

				logoButton.addEventListener('click', function(e) {
					registerClicks(e.source.data.id);
					Ti.App.fireEvent('goToCompanyView', e.source.data);
				});
				obj.push(logoButton);
				break;
		}

	}

	// Alimenta o grid com objetos
	var grid = new ui.GridLayout(obj, 5, 3);
	self.add(grid);


	function registerClicks(id) {
		var db = Ti.Database.install('/db/database.sqlite', 'database');
		// var db = Titanium.Database.open('database');
		db.execute('UPDATE companies SET clicks=(clicks + 1) WHERE id=' + id);
		db.close();
	}

	return self;
}

module.exports = HomeView;
