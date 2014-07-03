/*
 * Tema da estrutura básica do App (iOS & Android).
 */

var appOrange = '#F48120';
var appYellow = '#FFF112';
var appDarkYellow = '#E2C707';
var appBlack = '#000000';
var appPurple = '#E5007E';
var appLightBlue = '#F5F5F5';

var appWindowBackground = '#FFFFFF';

var appcRed = "#fff";

module.exports = {

	// Cores acessiveis em todo o app
	appOrange : appOrange,
	appYellow : appYellow,
	appDarkYellow : appDarkYellow,
	appBlack : appBlack,
	appPurple : appPurple,
	appLightBlue : appLightBlue,

	// Fundo das janelas
	windowBackground : '#FFFFFF',

	/*
	*  Topo
	*/

	// Barra superior (Android)
	actionBarView : {
		height : 44,
		top : 0,
		backgroundColor : appOrange,
	},

	// Barra superior (iOS)
	logoWindowAttr : {
		barColor : appOrange,
		titleImage : '/images/appc_white.png',
		backgroundColor : appWindowBackground,
	},

	// Barra de titulo de uma nova janela (Android)
	actionBarCustomWindowTitle : {
		left : 5,
		color : appYellow,
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		}
	},

	// Logo (Android)
	actionBarViewLogoImage : '/images/appc_white.png',
	actionBarViewLogoAttr : {
		left : 5,
	},

	// Botões superiores se for Titulo (Android)
	actionBarViewButtonsTitleAttr : {
		color : '#FFF',
		height : 'auto',
		width : 'auto',
		font : {
			fontSize : 14,
			fontWeight : 'bold',
		},
	},

	// Botões superiores se for icone (Android)
	actionBarViewButtonsImageAttr : {
		height : 20,
		width : 20,
	},

	// Botões superiores se for icone (iOS)
	logoWindowButtonsAttr : {
		image : '/images/14-gear.png',
	},

	// Botão superior ORB (Android)
	orbButtonAttr : {
		icon : '/images/14-gear@2x.png',
		width : 40,
	},

	/*
	* Corpo
	*/

	// View responsavel pelo conteudo das tabs (Android)
	scrollerContents : {
		top : 100,
		left : 0,
		right : 0,
		bottom : 0,
		showPagingControl : false,
		scrollingEnabled : false,
	},

	// Antigo (APAGAR)
	appcRed : appcRed,
	appcDarkGray : '#787878',
	appcLightGray : '#343434',

};
