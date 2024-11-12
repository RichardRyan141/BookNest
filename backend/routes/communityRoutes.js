const express = require('express');
const router = express.Router();
const { getCommunities, getCommunityDetails, createCommunity, joinCommunity, leaveCommunity } = require('../controllers/communityController');

router.get('/', getCommunities);

router.post('/create', createCommunity);

router.get('/:id', getCommunityDetails);

router.post('/join/:communityId', joinCommunity);
router.post('/leave/:communityId', leaveCommunity);

module.exports = router;
