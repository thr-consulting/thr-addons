## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#addNotification">addNotification(notification)</a></td>
    <td><p>Displays a notification.</p>
</td>
    </tr>
<tr>
    <td><a href="#removeNotification">removeNotification(notification)</a></td>
    <td><p>Removes a displayed notification</p>
</td>
    </tr>
</tbody>
</table>

## 

<table>
  <thead>
    <tr>
      <th>Global</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td><a href="#Notification">Notification</a></td>
    <td><p>The notification object can have even more properties. See <a href="https://github.com/igorprado/react-notification-system#creating-a-notification">React Notification System</a>
for more information.</p>
</td>
    </tr>
</tbody>
</table>

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

