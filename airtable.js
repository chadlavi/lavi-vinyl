const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_KEY
});

const base = Airtable.base(process.env.AIRTABLE_BASE);

const records = base(process.env.AIRTABLE_TABLE);

module.exports = {
  records
};
