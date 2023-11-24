import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

// route get like by ID user
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // init cookie store
    const cookieStore = cookies();
    // get token from coookies
    const token = cookieStore.get("access-token");
    // validate token
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // verify token
    verify(token.value, process.env.JWT_SECRET || "");

    // Decode the token
    const tokenDecode: any = jwtDecode(token.value);

    // get like
    const like = await prisma.like.findFirst({
      where: { id_post: params.id, id_user: tokenDecode.id },
    });

    if (!like) {
      return NextResponse.json({ message: "unlike" }, { status: 200 });
    }

    return NextResponse.json({ message: "like" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Oops something when wrong! ${error}` },
      { status: 500 }
    );
  }
};
