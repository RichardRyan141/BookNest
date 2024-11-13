const { Community, CommunityChannel, CommunityMember, Message } = require('../models'); // Assuming you have a Chapter model
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";

const getMessages = async (req, res) => {
    const { communityId, channelId } = req.params;
    const authHeader = req.headers.authorization;

    try {
        let userId = null;

        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const channel = await CommunityChannel.findOne({
            where: {
                id: channelId
            }
        });

        const community = await Community.findOne({
            where: {
                community_id: channel.community_id
            }
        });

        const member = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: community.id
            }
        });

        if (!member) {
            return res.status(403).json({ message: 'You are not a member of this community' });
        }

        let messages = null;

        if (channel.visibility == 'member') {
            messages = await Messages.findOne({
                where: {
                    channel_id: channel_id
                }
            });
        }
        if (channel.visibility == 'moderator') {
            if (member.role == 'member') {
                return res.status(403).json({ message: 'You do not have access to this channel' });
            }
            messages = await Message.findOne({
                where: {
                    channel_id: channel_id
                }
            });
        }
        if (channel.visibility == 'admin') {
            if ((member.role == 'member') || (member.role == 'moderator')) {
                return res.status(403).json({ message: 'You do not have access to this channel' });
            }
            messages = await Message.findOne({
                where: {
                    channel_id: channel_id
                }
            });
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const postMessage = async (req, res) => {
    const { communityId, channelId } = req.params
    const { content } = req.body;
    const authHeader = req.headers.authorization;

    if (!content) {
        return res.status(400).json({ message: 'Content is required' });
    }

    try {
        let userId = null;

        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to create a chapter' });
        }

        const channel = await CommunityChannel.findByPk(channelId);
        const community = await Community.findByPk(channel.community_id);
        const member = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: community.id
            }
        });

        if (!member) {
            return res.status(403).json({ message: 'You are not a part of this community' });
        }

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        const newMessage = await Message.create({
            content: content,
            channel_id: channelId,
            author_id: userId,
        });

        res.status(201).json({
            message: 'Message posted successfully',
            newMessage: newMessage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteMessage = async (req, res) => {
    const { communityId, channelId, messageId } = req.params;
    const authHeader = req.headers.authorization;

    if (!messageId || !channelId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let userId = null;

        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to delete a channel' });
        }

        const message = await Message.findByPk(messageId);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        const channel = await CommunityChannel.findByPk(channelId);
        const community = await Community.findByPk(channel.community_id);
        const member = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: community.id
            }
        });

        if (!member) {
            return res.status(401).json({ message: 'You are not a part of this community' });
        }

        if ((member.user_id != message.author_id) && (member.role == 'member')) {
            return res.status(403).json({ message: 'You are not the message poster, only moderator and above can delete messages by anyone' });
        }

        await Message.destroy({
            where: {
                id: messageId,
            }
        });

        res.status(200).json({
            message: 'Message deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getMessages, postMessage, deleteMessage };
