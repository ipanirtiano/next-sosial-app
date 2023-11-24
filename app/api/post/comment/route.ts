import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";

// route add comment
export const POST = async (request: Request) => {
  try {
    // get all request body
    const body = await request.json();
    // init cookie store
    const cookieStore = cookies();
    // get token from cookie
    const token = cookieStore.get("access-token");
    // validate token
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // verify token
    verify(token.value, process.env.JWT_SECRET || "");

    // Decode the token
    const tokenDecode: any = jwtDecode(token.value);

    // post a new comment
    const comment = await prisma.comment.create({
      data: {
        id_user: tokenDecode.id,
        id_post: body.id_post,
        des_comment: body.des_comment,
      },
    });

    return NextResponse.json(
      {
        message: "Add Comment succesfully..",
        data: comment,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Oops something wrong!..." },
      { status: 500 }
    );
  }
};
