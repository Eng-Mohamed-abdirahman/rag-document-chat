import { createDocument } from "@/lib/mongodb";
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
            return NextResponse.json({ error: "File size exceeds limit (100MB)" }, { status: 400 });
        }

        //  document id
        const documentId = `doc-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // 3. save the file information to the database 
        await createDocument({
            documentId,
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            filename: file.name,
            fileType: file.name.split('.').pop()?.toLowerCase() || 'unknown',
            fileSize: file.size,
            uploadedAt: new Date(),
            status: 'processing',
        });
        // 4. process the document (exract the text and create chunks)
        // 5. create embeddings for each chunk 
        // 6. store them in the vector database
        // 7. update document in mongodb 
        // 8. return a success response

    } catch (error) {

    }




}