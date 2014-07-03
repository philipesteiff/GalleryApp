//Application Window Component Constructor
function AppWindow() {
	//load component dependencies
	var _ = require('/lib/underscore'), theme = require('/ui/theme'), ui = require('/ui/components'), companies = require('/content/companies'),

	// Instancia as telas que compoe o app
	HomeView = require('/ui/HomeView'), CompanyView = require('/ui/CompanyView'), RegistrationView = require('/ui/RegistrationView'), MoreInfoView = require('/ui/MoreInfoView'), SupporterView = require('/ui/SupporterView');

	var self = new ui.Window({
		navBarHidden : true,
		exitOnClose : true,
		backgroundImage : '/images/bg_home.png',
		showScrollbars : false,
	});

	self.addEventListener('longclick', function() {

		Ti.Database.install('/db/database.sqlite', 'database');
		var db = Titanium.Database.open('database');

		var data;

		// Mostra todos os resultados na tabela (Comentar qunado for para a produção)
		var results = db.execute('SELECT * FROM register');
		while (results.isValidRow()) {
			Ti.API.log(results.fieldByName('id') + ',' + results.fieldByName('name') + ',' + results.fieldByName('company') + ',' + results.fieldByName('mail') + ',' + results.fieldByName('insert_date') + '<br />');
			data += results.fieldByName('id') + ',' + results.fieldByName('name') + ',' + results.fieldByName('company') + ',' + results.fieldByName('mail') + ',' + results.fieldByName('insert_date') + '<br />';
			results.next();
		}
		results.close();

		sendMail(data);

		data = null;
		results = null;
		results = db.execute('SELECT * FROM companies');
		while (results.isValidRow()) {
			Ti.API.log(results.fieldByName('id') + ',' + results.fieldByName('name') + ',' + results.fieldByName('clicks') + '<br />');
			data += results.fieldByName('id') + ',' + results.fieldByName('name') + ',' + results.fieldByName('clicks') + '<br />';
			results.next();
		}
		results.close();

		sendMail(data);

		db.close();
	});

	// GAMBISSS DO CARALHO!!!!
	function sendMail(name) {
		var Cloud = require('ti.cloud');
		Cloud.debug = false;

		Cloud.Emails.send({
			template : 'orb',
			recipients : 'philipesteiff@gmail.com',
			name : name
		}, function(e) {
			if (e.success) {
			} else {
				alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}


	self.addEventListener('android:back', function(e) {
		return false;
	});

	self.addEventListener('android:home', function(e) {
		return false;
	});

	self.addEventListener('android:volup', function(e) {
		return false;
	});
	self.addEventListener('android:voldown', function(e) {
		return false;
	});

	// Carrega o conteudo das empresas.
	var companiesContent = companies.Companies();

	var homeView = new HomeView();
	self.add(homeView);

	/*
	 * Controle de navegação
	 */

	Ti.App.addEventListener('goToCompanyView', function(data) {
		var w = new CompanyView(data);
		w.open();
	});

	Ti.App.addEventListener('goToRegistrationView', function() {
		var w = new RegistrationView();
		w.open();
	});

	Ti.App.addEventListener('goToMoreInfoView', function() {
		var w = new MoreInfoView();
		w.open();
	});

	Ti.App.addEventListener('goToSupporterView', function() {
		var w = new SupporterView();
		w.open();
	});

	return self;
}

//make constructor function the public component interface
module.exports = AppWindow;
