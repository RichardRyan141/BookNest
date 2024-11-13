const { CommunityMember, CommunityChannels } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";

const getChannelList = async (req, res) => {
    const { communityId } = req.params;
    const authHeader = req.headers.authorization;

    try {
        let userId = null;

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to view the channel list' });
        }

        const member = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: communityId
            }
        });

        if (!member) {
            return res.status(401).json({ message: 'You are not a part of this community' });
        }

        const channels = await CommunityChannels.findAll({
            where: {
                community_id: communityId,
                visibility: member.role
            }
        });

        res.status(200).json(channels.length ? channels : { message: 'No accessible channels found' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createChannel = async (req, res) => {
    const { communityId, name, description, visibility } = req.body;
    const authHeader = req.headers.authorization;

    if (!communityId || !name || !description || !visibility) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to create a channel' });
        }

        const member = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: communityId
            }
        });

        if (!member) {
            return res.status(401).json({ message: 'You are not a part of this community' });
        }

        if ((member.role != "admin") && (member.role != 'owner')) {
            return res.status(403).json({ message: 'Only owner and admin can create channels' });
        }

        const newChannel = await CommunityChannels.create({
            name: name,
            community_id: communityId,
            visibility: visibility,
        });

        res.status(201).json({
            message: 'Channel created successfully',
            channel: newChannel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteChannel = async (req, res) => {
    const { communityId, channelId } = req.params;
    const authHeader = req.headers.authorization;

    if (!communityId || !channelId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to delete a channel' });
        }

        const member = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: communityId
            }
        });

        if (!member) {
            return res.status(401).json({ message: 'You are not a part of this community' });
        }

        if ((member.role != "admin") && (member.role != 'owner')) {
            return res.status(403).json({ message: 'Only owner and admin can delete channels' });
        }

        await CommunityChannels.destroy({
            where: {
                id: channelId,
                community_id: communityId,
            }
        });

        res.status(200).json({
            message: 'Channel deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getChannelList, createChannel, deleteChannel };
