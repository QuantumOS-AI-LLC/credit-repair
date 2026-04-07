
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await request.json();
    const userId = session.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items selected' }, { status: 400 });
    }

    // Create a new dispute entry
    const dispute = await prisma.dispute.create({
      data: {
        userId,
        status: 'IN_PROGRESS',
      }
    });

    // Create letters for each selected item
    // In a real app, you'd generate the content based on the item and reason
    const letterBatch = items.map((item: any) => ({
      disputeId: dispute.id,
      content: `Dispute for ${item.title}: ${item.reason}`,
      cost: 2.50,
    }));

    await prisma.letter.createMany({
      data: letterBatch
    });

    return NextResponse.json({ success: true, disputeId: dispute.id });
  } catch (error) {
    console.error('Error creating dispute:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
