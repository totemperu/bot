WHATSAPP BUSINESS PERMANENT TOKEN

Reference:
https://developers.facebook.com/documentation/business-messaging/whatsapp/get-started

Notes: The Meta Developer App is separate from Business Facebook pages. Complete
all sections in order.

DEVELOPER APP SETUP

1. Navigate to https://developers.facebook.com/apps and create a new app.
2. Select "Use cases" from the app dashboard.
3. Choose "Connect with customers through WhatsApp" and proceed with
   customization.

WEBHOOK CONFIGURATION

4. In the Configuration section, add your callback URL.
5. Generate a verification token using generate-token.ts and set it in your
   environment file (.env or .env.production) as WHATSAPP_WEBHOOK_VERIFY_TOKEN.
   This value must match the token configured in the Meta dashboard.
6. Click "Verify and save" to trigger Meta's webhook verification call.

PHONE NUMBER REGISTRATION

7. Scroll to the "Phone numbers" section in the app configuration and click
   "Manage phone numbers".
8. In the sidebar, navigate to Account tools > Phone numbers.
9. Click "Add phone number" and follow the modal workflow to create your
   WhatsApp Business profile.
10. Complete number verification. Note that Meta may require additional page
    verification beyond code verification.

BUSINESS MANAGER CONFIGURATION

11. Access Business Manager settings at https://business.facebook.com/settings
    and select your Business Page.
12. Navigate to Users > System users.
13. Create a new system user with an arbitrary name and assign the admin role.

ASSET ASSIGNMENT

14. With the system user created, assign the following assets: the Developer App
    (found at https://developers.facebook.com/apps/) and the WhatsApp number
    configured earlier.
15. Enable "Manage app" to grant full control of the WhatsApp application.
16. Enable "Manage WhatsApp Business Accounts" to grant full control of the
    WhatsApp Business Account.

PERMANENT TOKEN GENERATION

17. Select the system user and click "Generate token" in the user panel.
18. Choose the app created in the Developer App Setup section.
19. Set the expiration date to "never".
20. Select all WhatsApp permissions: whatsapp_business_manage_events and
    whatsapp_business_messaging.
21. Click "generate token", copy the value, and store it securely in your
    environment configuration.

---

Pending: Review the Marketing Messages API for WhatsApp at
https://developers.facebook.com/documentation/business-messaging/whatsapp/marketing-messages/onboarding.
Compare pricing and availability against the current implementation.
