
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // In a real application, we would use a library like 'pdf-parse' to extract text from the PDF
    // or use OpenAI's Vision/File API. Since we are simulating the connection to AI for now:
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a credit repair specialist. We are simulating a credit report upload. Your task is to GENERATE a realistic, mock list of 5-7 potentially disputable items as if you just found them in a credit report. You MUST format the response strictly as a JSON object with an 'items' array. Each object in the array must have an 'item' (string, the name of the negative account) and a 'reason' (string, why it should be disputed)."
        },
        {
          role: "user",
          content: `Generate realistic mock dispute items. The user pretended to upload a file named: ${file.name}.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message?.content || '{"items": []}');
    
    console.log('--- AI ANALYSIS SUCCESS ---');
    console.log(`Analyzing file: ${file.name}`);
    console.log('Raw AI Response Content:', JSON.stringify(content, null, 2));

    // Ensure it's in the right format
    const items = content.items || content.disputable_items || content.credit_report_analysis || [];

    return NextResponse.json({ 
      success: true, 
      items: items.map((it: any, index: number) => ({
        id: `item-${index}`,
        title: it.item || it.title || "Unknown Item",
        reason: it.reason || "Discrepancy found in reporting accuracy."
      }))
    });

  } catch (error) {
    console.error('AI Analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze report' }, { status: 500 });
  }
}
