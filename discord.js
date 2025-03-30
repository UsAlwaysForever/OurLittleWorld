const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const discordWebhookUrl = 'https://discord.com/api/webhooks/1355626928987705364/3mV8pvo6xEhHwDT7SZFt3QRK-oLgyp-494Mrke_FDq8SlkSYFNi6ZrWgYqlfYpiXErPt'; // Yahan apna Discord webhook URL daalo

  if (req.body.type === 'deployment.ready') {
    const message = {
      content: `🎉 Site Online Hai! \nURL: ${req.body.url}\nDeployed at: ${new Date().toLocaleString()}`,
    };

    await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
  }

  res.status(200).send('Webhook received');
};