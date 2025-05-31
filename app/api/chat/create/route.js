import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Prepare the chat to be saved in the database
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
    };

    // Connect to the database and create a new chat
    await connectDB();
    await Chat.create(chatData);
    return NextResponse.json(
      { success: true, message: "Chat created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
