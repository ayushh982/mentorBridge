import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import MentorProfile from "../models/MentorProfile.js";

const createConversation = asyncHandler(async (req, res) => {
    const { receiverId } = req.body;

    const mentor = await MentorProfile.findById(receiverId);
    

    if (!mentor) {
        throw new ApiError(404, "Mentor not found");
    }

    const mentorUserId = mentor.user;

    const existingConversation = await Conversation.findOne({
        participants: {
            $all: [req.user._id, mentorUserId],
        },
    });

    if (existingConversation) {
        return res.status(200).json(
            new ApiResponse(
                200,
                existingConversation,
                "Conversation already exists"
            )
        );
    }

    const conversation = await Conversation.create({
        participants: [
            req.user._id,
            mentorUserId,
        ],
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            conversation,
            "Conversation created successfully"
        )
    );
});

const getConversations = asyncHandler(async (req, res) => {

    const conversations = await Conversation.find({
        participants: req.user._id,
    }).populate(
        "participants",
        "fullName avatar role"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            conversations,
            "Conversations fetched successfully"
        )
    );

});

const getMessages = asyncHandler(async (req, res) => {

    const messages = await Message.find({
        conversation: req.params.conversationId,
    }).populate(
        "sender",
        "fullName avatar"
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )
    );

});

export {
    createConversation,
    getConversations,
    getMessages,
};