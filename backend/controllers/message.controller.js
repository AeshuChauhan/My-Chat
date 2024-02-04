import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { isValidObjectId } from "../utils/utilFunction.js";

// messageController: function SendMessage
export const sendMessage = asyncHandler(async (req, res) => {

    // Check Condition: Get Sender Or Receiver Id or Not
    const { id: receiverId } = req.params;
    let senderId = req.user._id;
    if (!senderId) throw new ApiError(400, "Invalid sender ID");
    if (!receiverId) throw new ApiError(400, "Invalid reciever ID");
    if (!isValidObjectId(receiverId)) throw new ApiError(400, "Invalid Receiver ID");

    // Check : Receiver Id is valid or not
    const receiverData = await User.findOne({ _id: receiverId });
    if (!receiverData) throw new ApiError(400, "Invalid receiver ID");

    // Check Condition: Get Message Or Not
    const { message } = req.body;
    if (!req.body.message) throw new ApiError(400, "Invalid Message");
    if (message.length < 1) throw new ApiError(400, "Invalid Message Length");


    // Logic: Check Conversation Room Else Create New Conversation Room
    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, receiverId],
        }
    });
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    // Logic: Create Message and put condition for Error while creating a message
    let msgObj = {
        senderId,
        receiverId,
        message
    };
    const newMessage = new Message(msgObj);
    if (!newMessage) throw new ApiError(400, "Message Error: Something going bad in Create message");

    conversation.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(200).json(
        new ApiResponse(200, "Message Send SuccessFully", newMessage)
    );
});

export const getMessage = asyncHandler(async (req, res) => {
    // CHECK: get needed data from request: 
    const { id: userToChatID } = req.params;
    const senderId = req.user._id;
    if (!userToChatID) throw new ApiError(400, "Not Found: User ID");
    if (!isValidObjectId(userToChatID)) throw new ApiError(400, "Format Error: Invalid User ID");

    // Check: User ID is valid or not
    const userToChat = await User.findById(userToChatID);
    if (!userToChat) throw new ApiError(400, "Not Found: User ID");

    // Check: get conversation if already created a conversation
    let conversation = await Conversation.findOne({
        participants: {
            $all: [senderId, userToChatID],
        }
    }).populate("messages");

    //Return : if not any Conversation return [] array else Conversation
    if (!conversation) return res.status(200).json(
        new ApiResponse(200, "No Conversation Found", conversation)
    );

    const messages = conversation.messages;
    res.status(200).json(
        new ApiResponse(200, "Message Get SuccessFully", messages)
    )

});