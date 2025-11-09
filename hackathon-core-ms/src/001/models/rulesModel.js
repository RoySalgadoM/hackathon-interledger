'use strict';
let mongoose = require(process.env.NODE_LIBS_PATH + 'mongoose');
const Schema = mongoose.Schema;

const RulesModel = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rule: { type: Object, required: false },
    wallets: { type: Object, required: false },
    creationDate: { type: Date, required: true },
    lastUpdate: { type: Date, required: true },
    structure: { type: Object, required: false },
    state: { type: Boolean, required: false }
  },
  {
    versionKey: false,
    collection: 'rules'
  }
);

module.exports = mongoose.model('Rules', RulesModel);
