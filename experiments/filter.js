const helpers = require('../helpers');

let data = helpers.loadData('contacts.json');

//console.log(data.contacts);

let contacts = data.contacts;

let result = contacts.filter((el) => parseInt(el.mobile) === parseInt(8826624872));
console.log(result);