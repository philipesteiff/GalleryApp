function RegistrationView() {

	var _ = require('/lib/underscore'), theme = require('/ui/theme'), ui = require('/ui/components');

	// Variaveis que recebem os dados do formulario.
	var name;
	var company;
	var mail;

	var alertText = 'Atenção, este campo é obrigatorio.';

	var closeProcedure = setInterval(function() {
		self.close();
	}, 180000);

	var self = new ui.Window({
		navBarHidden : true,
	});

	/*
	 * Topo
	 */

	var topView = Ti.UI.createView({
		top : 0,
		right : 0,
		backgroundImage : '../images/registerbg.png'
	});

	var titleLabel = Ti.UI.createLabel({
		color : '#FFF',
		text : 'Cadastro',
		height : 'auto',
		width : 'auto',
		top : 70,
		left : 335,
		font : {
			fontSize : 40
		}
	});

	var closeButton = Ti.UI.createButton({
		backgroundImage : '../images/closebutton-azul.png',
		height : 92,
		width : 72,
		top : 0,
		right : 0,
		backgroundSelectedImage : '../images/closebuttonselected-azul.png'
	});

	closeButton.addEventListener('click', function() {
		self.close();
	});

	topView.add(titleLabel);
	topView.add(closeButton);

	/*
	 * Formulario
	 */

	var formView = Ti.UI.createView({
		top : 160,
		left : 290
	});

	// Nome

	var nameFormLabel = Ti.UI.createLabel({
		top : 100,
		left : 50,
		color : '#FFF',
		text : 'Nome*:',
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : 20
		}
	});

	var nameFormTextField = Ti.UI.createTextField({
		height : 'auto',
		top : 100,
		left : 160,
		width : 500,
		hintText : 'Digite aqui',
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	var nameGambis = false;

	nameFormTextField.addEventListener('change', function(e) {

		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);

		if (nameGambis === true)
			nameStatusLabel.show();

		if (trim(e.source.value).length > 0)
			nameStatusLabel.hide();

		nameGambis = true;
	});

	var nameStatusLabel = Ti.UI.createLabel({
		height : 'auto',
		width : 200,
		top : 100,
		right : 0,
		color : '#D00018',
		text : alertText,
		visible : false,
	});

	// Empresa

	var companyFormLabel = Ti.UI.createLabel({
		top : 150,
		left : 50,
		color : '#FFF',
		text : 'Empresa:',
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : 20
		}
	});

	var companyFormTextField = Ti.UI.createTextField({
		height : 'auto',
		top : 150,
		left : 160,
		width : 500,
		hintText : 'Digite aqui',
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	companyFormTextField.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);
	});

	// E-mail

	var mailFormLabel = Ti.UI.createLabel({
		top : 200,
		left : 50,
		color : '#FFF',
		text : 'E-mail*:',
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : 20
		}
	});

	var mailFormTextField = Ti.UI.createTextField({
		height : 'auto',
		top : 200,
		left : 160,
		width : 500,
		hintText : 'Digite aqui',
		softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_DEFAULT_ON_FOCUS, // Android only
		keyboardType : Ti.UI.KEYBOARD_EMAIL,
		returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	var mailGambis = false;

	mailFormTextField.addEventListener('change', function(e) {

		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);

		if (mailGambis === true)
			mailStatusLabel.show();

		if (trim(e.source.value).length > 0)
			mailStatusLabel.hide();

		if (!validateEmail(e.source.value) && mailGambis == true)
			mailStatusLabel.show();

		mailGambis = true;
	});

	var mailStatusLabel = Ti.UI.createLabel({
		height : 'auto',
		width : 200,
		top : 200,
		right : 0,
		color : '#D00018',
		text : alertText,
		visible : false
	});

	// Botão cadastrar
	var submitButton = new ui.Button({
		bottom : 250,
		left : 160,
		width : 89,
		height : 46,
		backgroundImage : '../images/sendbutton.png',
		backgroundSelectedImage : '../images/sendbuttonselected.png',
	});

	submitButton.addEventListener('click', function(e) {

		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);

		name = nameFormTextField.value || null;
		company = companyFormTextField.value || null;
		mail = mailFormTextField.value || null;

		if (name && mail && validateEmail(mail)) {
			if (checkNetworkState())
				sendMail();

			register(name, company, mail);

			nameFormTextField.value = ( name = null);
			companyFormTextField.value = ( company = null);
			mailFormTextField.value = ( mail = null);

			nameGambis = false;
			mailGambis = false;

			alert('Cadastro efetuado com sucesso!');
		} else {
			alert('Cadastro não efetuado, por favor verifique os campos obrigatórios.');
		}

	});

	formView.add(nameFormLabel);
	formView.add(nameFormTextField);
	formView.add(nameStatusLabel)

	formView.add(companyFormLabel);
	formView.add(companyFormTextField);

	formView.add(mailFormLabel);
	formView.add(mailFormTextField);
	formView.add(mailStatusLabel);

	formView.add(submitButton);

	/*
	 * Janela
	 */

	self.add(topView);
	self.add(formView);

	self.addEventListener('click', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);
	});

	self.addEventListener('swipe', function() {
		clearInterval(closeProcedure);
		closeProcedure = setInterval(function() {
			self.close();
		}, 180000);
	});

	function sendMail() {
		var Cloud = require('ti.cloud');
		Cloud.debug = false;

		Cloud.Emails.send({
			template : 'orb',
			recipients : mail,
			name : name,
			company : company,
			mail : mail
		}, function(e) {
			if (e.success) {
			} else {
				alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

	function register(name, company, mail) {

		var db = Ti.Database.install('/db/database.sqlite', 'database');
		// var db = Titanium.Database.open('database');

		db.execute('INSERT INTO register (name, company, mail) VALUES (?, ?, ?)', name, company, mail);

		// Mostra todos os resultados na tabela (Comentar qunado for para a produção)
		var results = db.execute('SELECT * FROM register');
		while (results.isValidRow()) {
			Ti.API.log(results.fieldByName('id') + '||' + results.fieldByName('name') + '||' + results.fieldByName('company') + '||' + results.fieldByName('mail') + '||' + results.fieldByName('insert_date'));
			results.next();
		}
		results.close();

		db.close();

	}

	function checkNetworkState() {
		if (Titanium.Network.online) {
			return true;
		} else {
			return false;
		}

	}

	// Função para remover espaços.
	function trim(str) {
		return str.split(' ').join('');
	}

	// Função para validar e-mail.
	function validateEmail(mail) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
			return true;
		return false;
	}

	return self;
}

module.exports = RegistrationView;
