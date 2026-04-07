
import { NextResponse } from 'next/server';
import { sendWebhook, WebhookAction } from '@/lib/webhook';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, data } = body as { action: WebhookAction, data: any };

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status:400 });
    }

    await sendWebhook(action, {
      ...data,
      userId: session.user.id,
      userEmail: session.user.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
