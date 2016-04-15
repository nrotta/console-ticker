'use strict';

const YQL = require('yqlp');

exports.getQuotes = function * (tickers) {
  const symbols = tickers.join(',');
  const query = `SELECT symbol, Currency, Ask, Change, PercentChange
                   FROM yahoo.finance.quotes
                  WHERE symbol IN ('${symbols}')`;

  try {
    const response = yield YQL.execp(query);
    return response.query.results.quote;
  } catch (err) {
    throw err;
  }
};
