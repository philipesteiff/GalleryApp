/*
 * Exporta todos os componentes para o app.
 */

var _ = require('/lib/underscore'), theme = require('/ui/theme');

function Component(/*Titanium Proxy Object*/tiView) {
	this.viewProxy = tiView;
}

// Invólucros para funções comuns do Titanium na construção da view.
Component.prototype.add = function(tiChildView) {
	var v = tiChildView.viewProxy || tiChildView;
	this.viewProxy.add(v);
};
Component.prototype.remove = function(tiChildView) {
	var v = tiChildView.viewProxy || tiChildView;
	this.viewProxy.remove(v);
};
Component.prototype.open = function(args) {
	if (this.viewProxy.open) {
		this.viewProxy.open(args || {
			animated : false
		});
	}
};
Component.prototype.close = function(args) {
	if (this.viewProxy.close) {
		this.viewProxy.close(args || {
			animated : false
		});
	}
};
Component.prototype.animate = function(args, callback) {
	this.viewProxy.animate(args, callback ||
	function() {
	});
};

// GET e SETTER para o proxy da view.
Component.prototype.get = function(key) {
	return this.viewProxy[key];
};
Component.prototype.set = function(key, value) {
	this.viewProxy[key] = value;
};

// Manipulação de eventos.
Component.prototype.addEventListener = function(event, callback) {
	switch (event) {
		case 'location':
			this.globalHandlers.location = callback;
			Ti.Geolocation.addEventListener('location', this.globalHandlers.location);
			break;
		case 'orientationchange':
			this.globalHandlers.orientationchange = callback;
			Ti.Gesture.addEventListener('orientationchange', this.globalHandlers.orientationchange);
			break;
		default:
			this.viewProxy.addEventListener(event, callback);
			break;
	}
};
Component.prototype.fireEvent = function(event, data) {
	this.viewProxy.fireEvent(event, data || {});
};

// Está deverá ser sobrescrita por qualquer componente que desejar executar um limpeza logica customizada.
Component.prototype.onDestroy = function() {
};

// Limpeza dos recursos usados neste componente.
Component.prototype.release = function() {
	// Força a limpeza no proxy
	this.viewProxy = null;

	// Logica limpa, no Android remove a atividade.
	this.onDestroy();
};

// Adicionando uma interface publica.
exports.Component = Component;

// Componentes encurtados do Titanium UI Object.
exports.TabGroup = function(args) {
	return Ti.UI.createTabGroup(args);
};
exports.Tab = function(args) {
	return Ti.UI.createTab(args);
};
exports.Window = function(args) {
	var orientationModes = [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT];
	return Ti.UI.createWindow(_.extend(args, {
		orientationModes : orientationModes,
		keepScreenOn : true
	}));
};
exports.View = function(args) {
	return Ti.UI.createView(args);
};
exports.ScrollView = function(args) {
	return Ti.UI.createScrollView(args);
};
exports.ScrollableView = function(args) {
	return Ti.UI.createScrollableView(args);
};

// Criar um botão com um título localizado.
exports.Button = function() {
	if ( typeof arguments[0] === 'string') {
		return Ti.UI.createButton(_.mixin({
			title : L(arguments[0], arguments[0])
		}, arguments[1] || {}));
	} else {
		return Ti.UI.createButton(arguments[0]);
	}
};

// Cria uma imagem com atributos defaults inteligentes.
exports.ImageView = function(img, args) {
	return Ti.UI.createImageView(_.extend({
		image : img,
		height : 'auto',
		width : 'auto'
	}, args || {}));
};

// Label com atributos defaults inteligentes, e construido baseado na plataforma.
var osname = Ti.Platform.osname;
exports.Label = function(text, args) {
	return Ti.UI.createLabel(_.extend({
		text : L(text, text),
		color : '#000',
		height : 'auto',
		width : 'auto',
		font : {
			fontFamily : (osname === 'android') ? 'Droid Sans' : 'Helvetica Neue',
			fontSize : 14
		}
	}, args || {}));
};

/*
* Componentes customizados.
*/

// Retorna um grid de objetos.

exports.GridLayout = function(objSet, xGrid, yGrid, cellWidth, cellHeight, xSpacer, ySpacer) {

	// to fit in a 320-wide space
	cellWidth = cellWidth || 232;
	cellHeight = cellHeight || 209;
	xSpacer = xSpacer || 0;
	ySpacer = ySpacer || 0;
	xGrid = xGrid || 5;
	yGrid = yGrid || 3;

	// no need to change anything below
	var objSetIndex = 0;
	var yGrid = objSet.length / xGrid;
	var tableData = [];

	for (var y = 0; y < yGrid; y++) {
		var thisRow = Ti.UI.createTableViewRow({
			layout : "horizontal",
			height : cellHeight + (2 * ySpacer),
			height : cellHeight,
			allowsSelection : false,
			selectedBackgroundColor : 'transparent',
		});
		for (var x = 0; x < xGrid; x++) {
			if (objSet[objSetIndex]) {
				var thisView = Ti.UI.createView({
					left : ySpacer,
					height : cellHeight,
					width : cellWidth
				});
				thisView.add(objSet[objSetIndex]);
				thisRow.add(thisView);
				objSetIndex++;
			}
		}
		tableData.push(thisRow);
	}
	return tableView = Ti.UI.createTableView({
		data : tableData,
		separatorColor : 'transparent', // Remove o separador entre as linhas.
		allowsSelection : false,
		selectedBackgroundColor : 'transparent',
	});

}

