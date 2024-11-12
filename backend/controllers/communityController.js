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
                role: 'owner'
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
    const { communityId } = req.params;
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
            member: newCommunityMember,
            role: 'member'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const leaveCommunity = async (req, res) => {
    const { communityId } = req.params;
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

        if (community.creator_id === userId) {
            const earliestAdmin = await CommunityMember.findOne({
                where: {
                    community_id: communityId,
                    role: 'admin'
                },
                order: [['createdAt', 'ASC']]
            });

            if (earliestAdmin) {
                await community.update({ creator_id: earliestAdmin.user_id });
                await earliestAdmin.update({ role: 'owner' })
            } else {
                return res.status(403).json({
                    message: 'You cannot leave the community because there are no other admins to take over ownership'
                });
            }
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

const promoteDemoteMember = async (req, res) => {
    const { communityId, memberId, newRoleId } = req.body;
    const authHeader = req.headers.authorization;

    const ROLE_MEMBER = 1;
    const ROLE_MODERATOR = 2;
    const ROLE_ADMIN = 3;

    if (!communityId || !memberId || !newRoleId) {
        return res.status(400).json({ message: 'Community ID, member ID, and new role ID are required' });
    }

    try {
        let userId = null;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        }

        if (!userId) {
            return res.status(401).json({ message: 'You must be logged in to perform this action' });
        }

        const community = await Community.findByPk(communityId);
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }

        const promoter = await CommunityMember.findOne({
            where: {
                user_id: userId,
                community_id: communityId
            }
        });

        const member = await CommunityMember.findOne({
            where: {
                user_id: memberId,
                community_id: communityId
            }
        });

        if (!promoter) {
            return res.status(403).json({ message: 'You are not a member of this community' });
        }

        if (!member) {
            return res.status(404).json({ message: 'Member is not a part of this community' });
        }

        const isOwner = community.creator_id === userId;
        const isAdmin = promoter.role == "admin";

        if (newRoleId === ROLE_ADMIN && !isOwner) {
            return res.status(403).json({ message: 'Only the community owner can promote a user to admin' });
        }
        if (newRoleId === ROLE_MODERATOR && !isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Only the community owner or an admin can promote a user to moderator' });
        }
        if (newRoleId === ROLE_MODERATOR && member.role == "admin" && !isOwner) {
            return res.status(403).json({ message: 'Only the community owner can demote an admin to moderator' });
        }
        if (newRoleId === ROLE_MEMBER && member.role == "admin" && !isOwner) {
            return res.status(403).json({ message: 'Only the community owner can demote an admin to member' });
        }
        if (newRoleId === ROLE_MEMBER && member.role == "moderator") {
            return res.status(403).json({ message: 'Only the community owner or an admin can demote a moderator to member' });
        }

        let newRole = null;
        if (newRoleId === ROLE_MEMBER) {
            newRole = 'member';
        }
        if (newRoleId === ROLE_MODERATOR) {
            newRole = 'moderator';
        }
        if (newRoleId === ROLE_ADMIN) {
            newRole = 'admin';
        }

        await member.update({ role: newRole })

        res.status(200).json({
            message: 'Member role updated successfully',
            member: {
                user_id: member.user_id,
                new_role: newRole
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCommunities, getCommunityDetails, createCommunity, joinCommunity, leaveCommunity, promoteDemoteMember };