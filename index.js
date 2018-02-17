"use strict";

const OPSkinsAPI = require('@opskins/api');
var opskins;

module.exports = {
	setup: (api) => {
		opskins = new OPSkinsAPI(api);
	},
	getPriceList: (app, callback) => {
		price(app, 'latest', callback);
	},
	getPricesList: (app, callback) => {
		price(app, 'all', callback);
	}
};

var price = (app, func, callback) => {
	opskins.getPriceList(app, ((err, prices) => {
		if (err) {
			callback(err);
		} else {
			var names = Object.getOwnPropertyNames(prices);
			if (func === 'latest') {
				var list = [];
				for (var i = 0; i <= names.length; i++) {
					if (i < names.length) {
						var name = names[i];
						var date = Object.getOwnPropertyNames(prices[name]);
						var price = prices[name][date[0]].price;
						list.push({
							name: name,
							price: price
						});
					} else {
						callback(null, list, list.length);
					}
				}
			} else if (func === 'all') {
				callback(null, prices, Object.keys(prices).length);
			}
		}
	}));
};