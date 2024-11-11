## Features 🚀

* **Channel Creation Protection:**
  * Bans users who create new channels (if they do not have a whitelist role).
* **Channel Deletion Protection:**
  * Bans users who delete channels (if they do not have a whitelist role).
* **Role Creation Protection:**
  * Bans users who create roles (if they do not have a whitelist role).
* **Role Deletion Protection:**
  * Bans users who delete roles (if they do not have a whitelist role).
* **Role Update Protection:**
  * Bans users who update a role (e.g., changing the name or permissions) (if they do not have a whitelist role).
* **Role Assignment Protection:**
  * Bans users who assign roles to others (if they do not have a whitelist role).
* **Ban Protection:**
  * Bans users who ban a member (if they do not have a whitelist role).
* **Unban Protection:**
  * Bans users who unban a member (if they do not have a whitelist role).

## Requirements

* Node.js v14+ and npm.
* A Discord Bot Token, which you can obtain by creating a bot on the [Discord Developer Portal](http://discord.com/developers).
* A Discord Client ID (it must match the bot you’re using for the token).
* Basic knowledge of Discord bot coding and server management.

## Configure Role IDs:

* **Allowed Roles (okRoles):**
  * Add role IDs to `src/actions/json/okRolesId.json`. These include roles like Server Booster, Member, and specific roles (e.g., Colors, Ages).
* **Whitelist Roles:**
  * Add role IDs to `src/actions/json/whitelistRolesId.json`. Whitelist roles typically include roles like Owner, Manager, Bots, and any special roles (e.g., "⭐").

## Installation

* Clone the repository:
    ```bash
    git clone https://github.com/drowning14/security-discord-bot-nodejs
    cd security-discord-bot-nodejs
    ```
* Install dependencies:
    ```bash
    npm install
    ```
* Create a `.env` file and add your bot token and client ID:
    ```
    token="YOUR_DISCORD_BOT_TOKEN"
    clientId="YOUR_DISCORD_BOT_CLIENT_ID"
    ```

## Contributing 🤝

Contributions are welcome! To suggest improvements or add features:

1. Fork the repository.
2. Create a new branch for your feature:
    ```bash
    git checkout -b feature/FeatureName
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/FeatureName
    ```
5. Open a pull request.

## Bug Reports 🐛

If you encounter any issues or bugs while using the bot, please let me know! You can report bugs by following these steps:

1. Go to the [Issues page](https://github.com/drowning14/security-discord-bot-nodejs/issues) of this repository.
2. Click on **New Issue** and select **Bug Report**.
3. Provide a descriptive title and detailed information about the issue:
    - Describe the bug.
    - Steps to reproduce the behavior.
    - Expected behavior vs. what actually happened.
    - Any error messages or screenshots, if applicable.
4. Submit the issue, and we’ll look into it as soon as possible.

Your feedback helps improve the bot for everyone! Thank you for contributing to its development.

don't forget star :)