// Simple Pinecone vector database integration
import { Pinecone } from '@pinecone-database/pinecone';


let pineconeClient: Pinecone | null = null;

/**
 * Initialize Pinecone client
 */
export function getPineconeClient(): Pinecone {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pineconeClient;
}

/**
 * Get Pinecone index
 */
export function getPineconeIndex() {
  const client = getPineconeClient();
  return client.index(process.env.PINECONE_INDEX_NAME || 'rag-pre');
}

/**
 * Store document chunks as vectors in Pinecone
 */
export async function storeVectors(
  documentId: string,
  chunks: Array<{ content: string; embedding: number[] }>,
  metadata: { title: string; filename: string; fileType: string }
) {
  try {
    const index = getPineconeIndex();
    
    // 🔄 TRANSFORM chunks into Pinecone vector format
    // 
    // EXAMPLE INPUT:
    // documentId = "doc123"
    // metadata = { title: "My Essay", filename: "essay.pdf", fileType: "pdf" }
    // chunks = [
    //   { content: "Introduction paragraph", embedding: [0.1, 0.2, 0.3, ...] },
    //   { content: "Main body content", embedding: [0.4, 0.5, 0.6, ...] },
    //   { content: "Conclusion text", embedding: [0.7, 0.8, 0.9, ...] }
    // ]
    //
    // STEP-BY-STEP TRANSFORMATION:
    //
    // ITERATION 1: chunk = { content: "Introduction paragraph", embedding: [0.1, 0.2, 0.3, ...] }, index = 0
    // Creates: {
    //   id: "doc123-chunk-0",
    //   values: [0.1, 0.2, 0.3, ...],
    //   metadata: {
    //     documentId: "doc123",
    //     chunkIndex: 0,
    //     content: "Introduction paragraph", 
    //     title: "My Essay",
    //     filename: "essay.pdf",
    //     fileType: "pdf",
    //     timestamp: "2024-01-15T10:30:00.000Z"
    //   }
    // }
    //
    // ITERATION 2: chunk = { content: "Main body content", embedding: [0.4, 0.5, 0.6, ...] }, index = 1  
    // Creates: {
    //   id: "doc123-chunk-1", 
    //   values: [0.4, 0.5, 0.6, ...],
    //   metadata: { documentId: "doc123", chunkIndex: 1, content: "Main body content", ... }
    // }
    //
    // ITERATION 3: chunk = { content: "Conclusion text", embedding: [0.7, 0.8, 0.9, ...] }, index = 2
    // Creates: {
    //   id: "doc123-chunk-2",
    //   values: [0.7, 0.8, 0.9, ...], 
    //   metadata: { documentId: "doc123", chunkIndex: 2, content: "Conclusion text", ... }
    // }
    //
    // FINAL OUTPUT (vectors array):
    // [
    //   { id: "doc123-chunk-0", values: [...], metadata: {...} },
    //   { id: "doc123-chunk-1", values: [...], metadata: {...} },  
    //   { id: "doc123-chunk-2", values: [...], metadata: {...} }
    // ]
    
    const vectors = chunks.map((chunk, index) => ({
      id: `${documentId}-chunk-${index}`,           // Unique ID for each chunk
      values: chunk.embedding,                       // The actual vector numbers  
      metadata: {                                    // Extra info stored with vector
        documentId,
        chunkIndex: index,
        content: chunk.content,
        title: metadata.title,
        filename: metadata.filename,
        fileType: metadata.fileType,
        timestamp: new Date().toISOString(),
      },
    }));

    // Upsert vectors in batches to avoid rate limits
    const batchSize = 100;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
    }

    console.log(`Stored ${vectors.length} vectors for document ${documentId}`);
    return vectors.length;
  } catch (error) {
    console.error('Error storing vectors:', error);
    throw new Error('Failed to store vectors in Pinecone');
  }
}

/**
 * Delete all vectors for a document
 */
export async function deleteDocumentVectors(documentId: string): Promise<void> {
  try {
    const index = getPineconeIndex();
    
    // Delete all vectors with the document ID filter (simple key-value format)
    await index.deleteMany({
      documentId: documentId
    });

    console.log(`Deleted vectors for document ${documentId}`);
  } catch (error) {
    console.error('Error deleting vectors:', error);
    throw new Error('Failed to delete vectors from Pinecone');
  }
}