const {db} = require("../../util/adminDbUtil");


const addNotification = async (collection, topicId, subject, action) => {

        const topicRef = db.collection(collection).doc(topicId);
        const topicDoc = await topicRef.get();
        const recipient = topicDoc.data().userId;

        const subjectRef = db.collection("users").doc(subject);
        const subjectDoc = await subjectRef.get();
        const subjectData = subjectDoc.data();

        const notification = {
            recipient: recipient,
            category: collection,
            topicId, topicId,
            action: action,
            timestamp: new Date(),
            subject: subjectData,
            read: false,
        }
        
        return db.collection("notifications").doc().set(notification);
}

const markAsRead = async (notificationId, userId) => {
    const notificationRef = db.collection("notifications").doc(notificationId);
    const notificationDoc = await notificationRef.get();
    const recipient = notificationDoc.data().recipient;

    if (recipient === userId)
    {
        return notificationRef.set({read: true}, {merge: true});
    }

    return Promise.reject('Permission denied');
}

const markAllAsRead = async (userId) => {
    const notificationsSnapshot = await db.collection("notifications").where('recipient', '==', userId).get();

    return notificationsSnapshot.forEach(doc => {
        doc.ref.set({read: true},{merge: true})
    });
}

module.exports = {
    addNotification,
    markAsRead,
    markAllAsRead
}