const express = require('express');
const router = express.Router();
const { getCommunities, getCommunityDetails, createCommunity, joinCommunity, leaveCommunity } = require('../controllers/communityController');
const { getChannelList, createChannel, deleteChannel } = require('../controllers/channelController');
const { getMessages, postMessage, deleteMessage } = require('../controllers/messageController');

router.get('/', getCommunities);

router.post('/create', createCommunity);

router.get('/:id', getCommunityDetails);

router.post('/join/:communityId', joinCommunity);
router.post('/leave/:communityId', leaveCommunity);

router.get('/:communityId/channels', getChannelList);
router.post('/:communityId/channels', createChannel);
router.delete('/:communityId/channels/:channelId', deleteChannel);

router.get('/:communityId/channels/:channelId', getMessages);
router.post('/:communityId/channels/:channelId', postMessage);
router.delete('/:communityId/channels/:channelId/:messageId', deleteMessage);

module.exports = router;
