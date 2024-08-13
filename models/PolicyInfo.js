const mongoose = require('mongoose');

const policyInfoSchema = new mongoose.Schema({
    policyNumber: String,
    startDate: Date,
    endDate: Date,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('PolicyInfo', policyInfoSchema);
