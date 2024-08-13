const xlsx = require('xlsx');
const Agent = require('../models/Agent');

module.exports = async function parseFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    for (const row of data) {
        const agent = new Agent({ name: row['Agent Name'] });
        await agent.save();
    }
};
