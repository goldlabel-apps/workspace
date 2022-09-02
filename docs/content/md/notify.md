## Notify Feature

**Agile Story** As an affiliate I want to be alerted of certain events so that I can take action quickly

### Background

We have been talking about Push Notifications to deliver Alerts, but this might be only part of the story. Perhaps Alerts need to be managed in a new table alerts. They can be displayed in the user account section on a per user basis. The hub shows a notification icon with a badge showing how many alerts they have. The user can view and dismiss them.

### Example Triggers

- Player value went up or down 15% during a 3 month period
- Player fraud detected
- Possible Implementation

Create a new lambda function alertAffiliate as the entry point for this feature. It takes the user's id (pk) and the alert details, saving it to the alerts table.

```javascript
{
    "pk": "notification#1234-xyz-etc",
    "time": 1234565,
    "message": "Bob's player value has decreased by 20% over the past 3 months",
    "dismissed": false
}
```
### Push Notifications

In order to send a Push Notification to a specific user, we need to store their device token when/if they allow them in their browser. A user  might have multiple device tokens if they access the hub from different devices. When the alertAffiliate lambda runs it checks to see if we have one or more values for device token and if so, it sends a push notification using AWS.

If there are no device tokens, no Push Notification can be sent, which is the reason for the extended functionality above

Jira

- HUB-305: Ensure web notifications is being sent to the Hub BLOCKED
- HUB-307: Integrate the notifications server with the Hub Frontend TO DO 

