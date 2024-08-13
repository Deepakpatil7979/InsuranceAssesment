const express = require('express');
const policyController = require('../controllers/policyController');

const router = express.Router();

router.get('/search', policyController.findPolicyByUsername);
router.get('/aggregate', policyController.aggregatePoliciesByUser);

module.exports = router;
