import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";

// route like or dislike
export const POST = async (request: Request) => {
  try {
    // get all request
    const body = await request.json();
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

    // check status like
    const like = await prisma.like.findFirst({
      where: { id_post: body.idPost, id_user: tokenDecode.id },
    });
    // validate status like
    if (like) {
      const unlike = await prisma.like.delete({ where: { id: like.id } });
      return NextResponse.json({ message: "unlike" }, { status: 200 });
    }

    // set like
    const setLike = await prisma.like.create({
      data: {
        id_post: body.idPost,
        id_user: tokenDecode.id,
      },
    });

    // retrun response like
    return NextResponse.json(
      { message: "like", data: setLike },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Oops something when wrong! ${error}` },
      { status: 500 }
    );
  }
};
