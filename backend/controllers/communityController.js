const { User, Community, CommunityMember } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "03f166d26bab9394365d354cdba95cea17936b4df707e41a24d1d51769dfee58";
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/community-logo');
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const filename = `${Date.now()}${fileExtension}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG, JPG, PNG, and GIF are allowed'), false);
        }
    }
}).single('logo_path');

const getCommunities = async (req, res) => {
    try {
        const communities = await Community.findAll();
        res.json(communities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch communities' });
    }
};

const getCommunityDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const community = await Community.findOne({
            where: { id },
            include: [{
                model: User,
                as: 'creator',
                attributes: ['name']
            }]
        });


        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        const memberCount = await CommunityMember.count({
            where: {
                community_id: id
            }
        });

        const members = await CommunityMember.findAll({
            where: { community_id: id },
            include: [{
                model: User,
                attributes: ['id', 'name']
            }]
        });

        const communityDetails = {
            name: community.name,
            description: community.description,
            memberCount: memberCount,
            creator: community.creator.name,
            createdAt: community.createdAt,
            members: members.map(member => ({
                id: member.User.id,
                name: member.User.name,
            }))

        };

        res.status(200).json(communityDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch community details' });
    }
};

const createCommunity = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token required' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        creator_id = decoded.id;

        const { name, description } = req.body;
        let logo_path = null;

        if (!name || !description) {
            return res.status(400).json({ message: 'Name and description are required' });
        }

        try {
            const newCommunity = await Community.create({
                name: name,
                description: description,
                creator_id: creator_id
            });

            if (req.file) {
                logoImage = `uploads/community-logo/${newCommunity.id}${path.extname(req.file.originalname)}`;
                const fs = require('fs');
                const oldPath = req.file.path;
                const newPath = `./uploads/community-logo/${newCommunity.id}${path.extname(req.file.originalname)}`;
                
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File renamed successfully');
                    }
                });
            }

            if (logoImage) {
                await newCommunity.update({ logoImage });
            }

            await CommunityMember.create({
                user_id: userId,
                community_id: newCommunity.id,
            });

            res.status(201).json({
                message: 'Community created successfully',
                community: newCommunity,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to make community' });
        }
    });
};

const joinCommunity = async (req, res) => {
    const { communityId } = req.body;
    const authHeader = req.headers.authorization;

    if (!communityId) {
        return res.status(400).json({ message: 'Community ID is required' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to create a chapter' });
        }

        const community = await Community.findByPk(communityId);

        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        const newCommunityMember = await CommunityMember.create({
            user_id: userId,
            community_id: communityId,
        });

        res.status(201).json({
            message: 'Joined community successfully',
            member: newCommunityMember
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const leaveCommunity = async (req, res) => {
    const { communityId } = req.body;
    const authHeader = req.headers.authorization;

    if (!communityId) {
        return res.status(400).json({ message: 'Community ID is required' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to create a chapter' });
        }

        const community = await Community.findByPk(communityId);

        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        await CommunityMember.destroy({
            where: {
                user_id: userId,
                community_id: communityId
            }
        });

        res.status(201).json({
            message: 'Left community successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCommunities, getCommunityDetails, createCommunity, joinCommunity, leaveCommunity };