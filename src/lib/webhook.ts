
export type WebhookAction = 'USER_REGISTERED' | 'APPLICATION_SUBMITTED' | 'DISPUTE_UPDATED' | 'PAYMENT_RECEIVED' | 'PROFILE_COMPLETED';

interface WebhookPayload {
  action: WebhookAction;
  timestamp: string;
  data: any;
}

export async function sendWebhook(action: WebhookAction, data: any) {
  const webhookUrl = process.env.WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('WEBHOOK_URL is not defined in environment variables');
    return;
  }

  const payload: WebhookPayload = {
    action,
    timestamp: new Error().stack?.includes('createUser') ? new Date().toISOString() : new Date().toISOString(), // Just using new Date()
    data,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Webhook failed with status: ${response.status}`);
    } else {
      console.log(`Webhook sent successfully: ${action}`);
    }
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}
