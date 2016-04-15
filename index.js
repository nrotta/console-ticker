const co = require('co');
const Table = require('cli-table');
const Colors = require('colors');

const Stocks = require('./lib/stocks');

const colorize = value => {
  var raw = value.replace(/%/g, '');

  if (raw == 0) {
    return raw;
  } else if (raw > 0) {
    return raw.green;
  } else {
    return raw.red;
  }
};

const quotes = [
  'AAPL', 'GOOG', 'SLCA', 'TWTR', 'V', 'VZ', 'WFC', 'AMBA', 'DIS', 'EWG'
];

var table = new Table({
  head: ['Symbol', 'Price', '% Change', 'Change'],
  colWidths: [30, 30, 30, 30]
});

setInterval(() => {
  console.log('\033c');
  table.splice(0, table.length);
  
  co(function * () {
    const data = yield Stocks.getQuotes(quotes);

    data.forEach((element, index, array) => {
      table.push([
        element.symbol.yellow,
        `${element.Currency} ${element.Ask}`,
        colorize(element.PercentChange),
        colorize(element.Change)
      ]);
    });

    console.log(table.toString());
  }).catch(err => {
    throw err;
  });
}, 3000);
