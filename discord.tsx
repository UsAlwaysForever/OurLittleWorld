
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1355626928987705364/3mV8pvo6xEhHwDT7SZFt3QRK-oLgyp-494Mrke_FDq8SlkSYFNi6ZrWgYqlfYpiXErPt'; // Yahan apna Discord webhook URL daalo

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Check if deployment is ready
    if (req.body.type === 'deployment.ready') {
      const payload = {
        content: `🎉 Site Online Hai!\nURL: ${req.body.url}\nDeployed at: ${new Date().toLocaleString()}`,
      };

      // Send message to Discord
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook failed with status: ${response.status}`);
      }

      return res.status(200).json({ message: 'Notification sent to Discord' });
    }

    // If not a deployment.ready event, just acknowledge
    return res.status(200).json({ message: 'Webhook received, no action taken' });
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}