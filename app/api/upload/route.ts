import { generateEmbeddings } from "@/lib/ai/embedding";
import { processDocuments } from "@/lib/document-processor";
import { createDocument, updateDocument } from "@/lib/mongodb";
import { storeVectors } from "@/lib/pinecone";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 1. get the file from the request
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // 2. validate the file

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const maxFileSize = 100 * 1024 * 1024; // 10MB

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { error: "File size exceeds limit (100MB)" },
        { status: 400 }
      );
    }

    //  document id
    const documentId = `doc-${Date.now()}-${Math.random()
      .toString(36)
      .substring(7)}`;

    // 3. save the file information to the database
    await createDocument({
      documentId,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      filename: file.name,
      fileType: file.name.split(".").pop()?.toLowerCase() || "unknown",
      fileSize: file.size,
      uploadedAt: new Date(),
      status: "processing",
    });
    // 4. process the document (exract the text and create chunks)
    const { content, chunks } = await processDocuments(file);
    if (chunks.length === 0) {
      // Update document status to error
      await updateDocument(documentId, {
        status: "error",
        errorMessage: "No content could be extracted from the file.",
      });

      return NextResponse.json(
        { error: "No content could be extracted from the file." },
        { status: 400 }
      );
    }
    // 5. create embeddings for each chunk
    const embeddings = await generateEmbeddings(chunks);
    // 6. store them in the vector database
    // Store vectors in Pinecone
    const vectorCount = await storeVectors(documentId, embeddings, {
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      filename: file.name,
      fileType: file.name.split(".").pop()?.toLowerCase() || "unknown",
    });
    // 7. update document in mongodb
    await updateDocument(documentId, {
      status: "completed",
      processedAt: new Date(),
      chunkCount: chunks.length,
      vectorCount,
      contentLength: content.length,
    });
    // 8. return a success response
    return NextResponse.json({
      success: true,
      documentId,
      filename: file.name,
      message: `Successfully processed ${chunks.length} chunks and stored ${vectorCount} vectors.`,
      stats: {
        originalSize: file.size,
        chunkCount: chunks.length,
        vectorCount,
        contentLength: content.length,
      },
    });
  } catch (error) {
    console.error("Upload processing error:", error);

    return NextResponse.json(
      {
        error: "Failed to process document",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
