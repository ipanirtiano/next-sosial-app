import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";

// route get post by ID user
export const GET = async (request: Request) => {
  try {
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

    // get all post by ID user
    const myPosts = await prisma.post.findMany({
      where: {
        id_user: tokenDecode.id,
      },
      include: {
        User: true,
        comment: {
          include: { User: true },
        },
        like: true,
      },
      orderBy: { id: "desc" },
    });
    return NextResponse.json({ data: myPosts }, {status: 200});
  } catch (error) {
    return NextResponse.json(
      { error, message: "Oops something wrong!..." },
      { status: 500 }
    );
  }
};
