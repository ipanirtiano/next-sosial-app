import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { verify } from "jsonwebtoken";

// route update user
export const PATCH = async (request: Request) => {
  try {
    // get all request body
    const body = await request.json();
    // init cookie store
    const cookieStore = cookies();
    // get token from cookies
    const token = cookieStore.get("access-token");
    // validate token
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // verify token
    verify(token.value, process.env.JWT_SECRET || "");
    // Decode the token
    const tokenDecode: any = jwtDecode(token.value);

    // update user profile
    const user = await prisma.user.update({
      where: { id: tokenDecode.id },
      data: {
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        facebook: body.facebook,
        instagram: body.instagram,
        twitter: body.twitter,
        profile_pic: body.profile_pic,
        cover_pic: body.cover_pic,
      },
    });

    // return response
    return NextResponse.json(
      { message: "Update profile successfully...", user: user },
      { status: 200 }
    );
  } catch (error) {}
};
