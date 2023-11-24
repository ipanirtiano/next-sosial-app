import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";

// route get ME
export const GET = async (request: Request) => {
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

    // validate expire token

    // get user form database by ID
    const user = await prisma.user.findFirst({
      where: {
        id: tokenDecode.id,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        instagram: true,
        facebook: true,
        twitter: true,
        profile_pic: true,
        cover_pic: true,
      },
    });

    // return user
    return NextResponse.json(user, {status: 200});
  } catch (error) {
    return NextResponse.json(
      { error, message: "Oops something wrong!..." },
      { status: 500 }
    );
  }
};
