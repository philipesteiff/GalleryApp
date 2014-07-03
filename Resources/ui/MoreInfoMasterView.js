function MoreInfoMasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor : '#fff',
	});

	var tableData = [{
		title : 'company           ',
		url : '../content/company.html',
		allowsSelection : false,
		selectedBackgroundColor : 'transparent',
		layout : "horizontal",
		top : 15,
		bottom : 15,
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},
		color : '#00AEE0'
	}, {
		title : 'TRADE SHOW        ',
		url : '../content/tradeshow.html',
		allowsSelection : false,
		selectedBackgroundColor : 'transparent',
		layout : "horizontal",
		top : 15,
		bottom : 15,
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},
		color : '#00AEE0'
	}, {
		title : 'Company',
		url : '../content/company.html',
		allowsSelection : false,
		selectedBackgroundColor : 'transparent',
		layout : "horizontal",
		top : 15,
		bottom : 15,
		font : {
			fontSize : 18,
			fontWeight : 'bold'
		},
		color : '#00AEE0'
	}];

	var table = Ti.UI.createTableView({
		top : 141,
		left : 10,
		right : 10,
		height : 600,
		rowHeight : 300,
		separatorColor : '#00AEE0', // Remove o separador entre as linhas.
		allowsSelection : false,
		data : tableData,
	});
	self.add(table);

	table.addEventListener('click', function(e) {

		tableData[0].color = '#00AEE0';

		tableData[1].color = '#00AEE0';

		tableData[2].color = '#00AEE0';

		table.updateRow(0, tableData[0]);
		table.updateRow(1, tableData[1]);
		table.updateRow(2, tableData[2]);

		//

		tableData[e.index].color = '#00AEE0';

		table.updateRow(e.index, tableData[e.index]);

		self.fireEvent('itemSelected', {
			url : e.rowData.url
		});
	});

	return self;
};

module.exports = MoreInfoMasterView;
