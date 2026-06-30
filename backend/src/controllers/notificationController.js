const { getMyNotifications, markAsRead } = require("../services/notificationService");

const getMyNotificationsController = async (req, res) => {
    try {
        const notifications = await getMyNotifications(req.user.id);
        return res.json(notifications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const markAsReadController = async (req, res) => {
    try {
        const notification = await markAsRead({
            notificationId: req.params.id,
            userId: req.user.id,
        });
        return res.json(notification);
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    getMyNotificationsController,
    markAsReadController,
};
