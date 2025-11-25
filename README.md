# 🚀 RAG Document Chat

A modern **Retrieval-Augmented Generation (RAG)** system that allows you to upload documents and **chat with them using AI**.  
Fast semantic search, GPT-4 responses, and a clean ChatGPT-style UI.

---

## ✨ Features

- 📄 **Document Upload**  
  Supports **PDF, DOCX, TXT, and MD** files.

- 🤖 **AI Document Chat**  
  Ask any question about your documents using **GPT-4**.

- 🔍 **Semantic Search (RAG)**  
  Retrieves relevant text using vector embeddings.

- 💾 **Persistent Storage**  
  - **MongoDB** for document metadata and raw text  
  - **Pinecone** for vector embeddings

- 🎨 **Modern Interface**  
  Responsive ChatGPT-style UI built with Tailwind CSS and Next.js.

---

## 🧱 Tech Stack

### **Frontend**
- Next.js 15  
- React  
- TypeScript  
- Tailwind CSS  

### **Backend**
- Next.js API Routes  
- AI SDK  

### **Databases**
- **MongoDB** — stores uploaded documents  
- **Pinecone** — stores embeddings for semantic search  

### **AI**
- **OpenAI GPT-4** (chat responses)  
- **Embeddings models** for vector search  

---

## 🚀 Usage

### **1️⃣ Upload Documents**
Navigate to the **Upload** page and add your files (PDF, DOCX, TXT, MD).

### **2️⃣ Processing & Embedding**
Documents are automatically:
- Split into chunks  
- Converted into embeddings  
- Stored in MongoDB + Pinecone  

### **3️⃣ Start Chatting**
Choose a document and ask any question — the system retrieves relevant chunks and generates smart AI responses using RAG.



