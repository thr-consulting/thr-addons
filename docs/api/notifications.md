---
sidebar_label: Notifications
title: Notifications
---

[![](assets/coverage/notifications/coverage.svg)](assets/coverage/notifications/index.html)

Notifications Addon that displays growl-like messages.

## Install
```
yarn add @thx/notifications
```
<a name="addNotification"></a>

## addNotification(notification)
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| notification | [<code>Notification</code>](#Notification) | The notification object. |

Displays a notification.


* * *

<a name="removeNotification"></a>

## removeNotification(notification)
**Tag**: Action  

| Param | Type | Description |
| --- | --- | --- |
| notification | [<code>Notification</code>](#Notification) | The notification object. |

Removes a displayed notification


* * *

<a name="Notification"></a>

## Notification
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | The notification level, 'error', 'success', etc. |
| title | <code>string</code> | The notifcation title. |
| message | <code>string</code> | The notification message. |
| position | <code>string</code> | The notifications position on screen, 'br', 'tr', 'bl', 'tl', etc. |

The notification object can have even more properties. See [React Notification System](https://github.com/igorprado/react-notification-system#creating-a-notification)
for more information.


* * *

