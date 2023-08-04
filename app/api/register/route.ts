import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing info", success: false },
        { status: 402 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "User Successfuly Created", success: true, user: user },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Registration error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
