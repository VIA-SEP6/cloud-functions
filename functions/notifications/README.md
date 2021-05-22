# Cloud Functions Notifications

### `POST` Mark Notification As Read

Mark notification as read<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/notifications-markAsRead`

```js
const requestBody = {
  data: {
    notificationId: "46345",
  },
};
```

### `POST` Mark all as read for a specific user

Mark all notifications as read<br>

`https://europe-west1-sep6-310611.cloudfunctions.net/notifications-markAllAsRead`

```js
const requestBody = {
  data: {},
};
```
