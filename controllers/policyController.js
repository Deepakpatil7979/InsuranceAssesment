const User = require('../models/User');
const PolicyInfo = require('../models/PolicyInfo');

exports.findPolicyByUsername = async (req, res) => {
    const { username } = req.query;
    try {
        const user = await User.findOne({ firstName: username });
        if (!user) return res.status(404).send('User not found.');

        const policies = await PolicyInfo.find({ userId: user._id });
        res.json(policies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.aggregatePoliciesByUser = async (req, res) => {
    try {
        const aggregatedPolicies = await PolicyInfo.aggregate([
            {
                $group: {
                    _id: '$userId',
                    policies: { $push: '$$ROOT' }
                }
            }
        ]);
        res.json(aggregatedPolicies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
