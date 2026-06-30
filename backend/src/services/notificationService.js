const Notification = require("../models/Notification");

const getMyNotifications = async (userId) => {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    return notifications;
};

const markAsRead = async ({ notificationId, userId }) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: notificationId, userId },
        { read: true },
        { new: true }
    );
    if (!notification) {
        const error = new Error("Notificação não encontrada.");
        error.status = 404;
        throw error;
    }
    return notification;
};

module.exports = {
    getMyNotifications,
    markAsRead,
};
