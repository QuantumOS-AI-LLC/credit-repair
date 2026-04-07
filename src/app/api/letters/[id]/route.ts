
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// DELETE a letter
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await prisma.letter.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting letter:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// UPDATE a letter (e.g., mark as sent)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    if (action === 'SEND') {
      await prisma.letter.update({
        where: { id },
        data: {
          postgridId: `simulated_${Date.now()}`,
          postgridStatus: 'SENT'
        }
      });

      // Update associated dispute status too
      const letter = await prisma.letter.findUnique({ where: { id } });
      if (letter) {
        await prisma.dispute.update({
          where: { id: letter.disputeId },
          data: { status: 'IN_PROGRESS' }
        });
      }
    }

    if (action === 'EDIT') {
      await prisma.letter.update({
        where: { id },
        data: { content: body.content }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating letter:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
