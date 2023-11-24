import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";

// get all post
export const GET = async (request: Request) => {
  try {
    // get all post
    const response = await prisma.post.findMany({
      include: { User: true, comment: true, like: true },
      orderBy: { id: "desc" },
    });
    // return
    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json(
      { error, message: "Oops something wrong!..." },
      { status: 500 }
    );
  }
};

// route create a new post
export const POST = async (request: Request) => {
  try {
    // get all request
    const body = await request.json();
    // init cookiestore
    const cookieStore = cookies();
    // get token from cookie
    const token = cookieStore.get("access-token");
    // validate token
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // verify token
    verify(token.value, process.env.JWT_SECRET || "");

    // decode token
    const tokenDecode: any = jwtDecode(token.value);

    // create a new post
    const post = await prisma.post.create({
      data: {
        id_user: tokenDecode.id,
        description_post: body.description_post,
        image_post: body.image_post,
      },
    });

    // return response
    return NextResponse.json(
      {
        message: "Create Post succesfully..",
        data: post,
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
