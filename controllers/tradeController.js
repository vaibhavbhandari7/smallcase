const trade = require("../models/trade");
const assignHttpStatusCode = require("../helpers/assignHttpStatusCode");
const { ValidationException } = require("../exceptions/");
const modelRecordAlreadyExists = require("../helpers/modelRecordAlreadyExists")
const modelFetchOne = require("../helpers/modelFetchOne")

exports.getTrades = async (req, res) => {
  try {
    const trades = await trade.find({}, ['tickerSymbol', 'avgBuyPrice', 'shares']);
    response = {
      data: trades
    }
    res.json(response);
  } catch (err) {
    const statusCode = assignHttpStatusCode(err);
    return res.status(statusCode).json(err.toString());
  }
};

exports.addTrade = async (req, res) => {
  try {
    const { tickerSymbol, avgBuyPrice, shares } = req.body;
    await modelRecordAlreadyExists({
      Model: trade,
      name: 'Ticker',
      data: { tickerSymbol },
    });
    const newTrade = new trade({ tickerSymbol, avgBuyPrice, shares });
    const savedTrade = await newTrade.save();
    response = {
      data: savedTrade
    }
    res.json(response);
  } catch (err) {
    const statusCode = assignHttpStatusCode(err);
    return res.status(statusCode).json(err.toString());
  }
};

exports.updateTradeById = async (req, res) => {
  try {
    const { id } = req.params;
    const details = req.body;
    const existingTrade = await modelFetchOne({
      Model: trade,
      name: 'Trade',
      id
    })
    let { avgBuyPrice, shares } = existingTrade
    if (details.method.toLowerCase() === "sell") {
      if (existingTrade.shares < details.shares) {
        throw new ValidationException.ValidationException({ message: `cannot sell more than ${shares}` })
      }
      existingTrade.shares -= Number.parseInt(details.shares);
      await existingTrade.save();
    } else if (details.method.toLowerCase() === "buy") {
      let sum = avgBuyPrice * shares;
      sum += Number.parseInt(details.shares) * Number.parseFloat(details.buyPrice);
      existingTrade.shares += Number.parseInt(details.shares);
      existingTrade.avgBuyPrice = sum / existingTrade.shares;
      await existingTrade.save();
    }
    response = {
      data: existingTrade
    }
    res.json(response);
  } catch (err) {
    const statusCode = assignHttpStatusCode(err);
    return res.status(statusCode).json(err.toString());
  }
};

exports.deleteTradeById = async (req, res) => {
  try {
    const tickerId = req.params.id;
    await modelFetchOne({
      Model: trade,
      name: 'Trade',
      tickerId
    })
    const deletedTicker = await trade.findByIdAndDelete(tickerId);
    response = {
      data: deletedTicker
    }
    res.json(response);
  } catch (err) {
    const statusCode = assignHttpStatusCode(err);
    return res.status(statusCode).json(err.toString());
  }
};

exports.getReturns = async (req, res) => {
  try {
    const marketPrice = 100;
    const trades = await trade.find({}, ['tickerSymbol', 'avgBuyPrice', 'shares']);
    const details = []
    let returns = 0;
    trades.map((trade) => {
      details.push({ ...trade._doc, marketPrice })
      returns += (marketPrice - trade.avgBuyPrice) * trade.shares;
    })
    let response = {
      returns,
      details
    };
    return res.json(response);
  } catch (err) {
    const statusCode = assignHttpStatusCode(err);
    return res.status(statusCode).json(err.toString());
  }
};
