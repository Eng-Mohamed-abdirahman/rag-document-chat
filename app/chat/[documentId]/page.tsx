import { connectToDB, getDocument, getMessages } from '@/lib/mongodb';
import { redirect } from 'next/navigation';
import ChatInterface from '@/components/chatInterface';
import { UIMessage } from 'ai';

interface PageProps {
  params: Promise<{ documentId: string }>;
}

// Server-side function to load chat history
async function loadChatHistory(documentId: string): Promise<UIMessage[]> {
  try {
    await connectToDB();
    
    // Get chat history for the document (conversation) using Mongoose
    const messages = await getMessages(documentId);

    // Convert to AI SDK format
    return messages.map(msg => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      parts: [{ type: 'text' as const, text: msg.content }],
      createdAt: new Date(msg.createdAt),
    }));
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
}


export default async function ChatPage({ params }: PageProps) {
  const { documentId } = await params;
  
  console.log('Chat page - documentId:', documentId);
  
  // Validate document exists
  const document = await getDocument(documentId);
  console.log('Chat page - document found:', !!document);
  
  if (!document) {
    console.log('Chat page - document not found, redirecting to home');
    redirect('/');
  }

  // Load chat history server-side
  const initialMessages = await loadChatHistory(documentId);

  return (
    <ChatInterface 
      selectedDocumentId={documentId}
      initialMessages={initialMessages}
      documentTitle={document.title}
    />
  );
}