import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import argon2 from "argon2";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";

// route login
export const POST = async (request: Request) => {
  try {
    // get all request
    const body = await request.json();
    // get user from database
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });
    // validate user
    if (user) {
      // validate hashpassword
      const matchPassword = await argon2.verify(user.password, body.password);
      if (matchPassword) {
        // set JWT Token
        // get secret jwt
        const secretJWT = process.env.JWT_SECRET || "";
        // set Token
        const token = sign(
          { id: user.id, email: user.email, full_name: user.full_name },
          secretJWT,
          { expiresIn: 60 * 60 * 24 * 30 } // a days
        );

        // set Cookies and sent to browser
        const setCookie = serialize("access-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30, // a days
          path: "/",
        });

        // return response token cookies
        return NextResponse.json(
          { token: token },
          { status: 200, headers: { "Set-Cookie": setCookie } }
        );
      } else {
        // return unauthorized
        return NextResponse.json(
          { message: "Unauthorized! Email or Password not registered" },
          { status: 401 }
        );
      }
    } else {
      // return unauthorized
      return NextResponse.json(
        { message: "Unauthorized! Email or Password not registered" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error, message: "Opps something went wrong!" },
      { status: 500 }
    );
  }
};
