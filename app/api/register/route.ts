import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";
import argon2 from "argon2";

// route create a new user
export const POST = async (request: Request) => {
  try {
    // get all requeset
    const body = await request.json();

    // validate confirm password
    if (body.password !== body.confirm_password) {
      return NextResponse.json(
        { message: "Password dont match!" },
        { status: 500 }
      );
    }

    // hash password
    const hashPassword = await argon2.hash(body.password);

    // create a new user
    const user = await prisma.user.create({
      data: {
        full_name: body.full_name,
        email: body.email,
        phone: "null",
        instagram: "null",
        facebook: "null",
        twitter: "null",
        profile_pic: "profile.png",
        cover_pic:
          "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
        password: hashPassword,
      },
    });

    // return response user
    return NextResponse.json(
      { data: user, message: "User created successfully..." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Oops something wrong!..." },
      { status: 500 }
    );
  }
};
