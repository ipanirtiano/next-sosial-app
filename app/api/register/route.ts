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
        profile_pic:
          "https://res.cloudinary.com/dqxwj5jsh/image/upload/v1700921652/profile/ngxjdezfzlkugmcymo8g.png",
        cover_pic:
          "https://res.cloudinary.com/dqxwj5jsh/image/upload/v1700922269/cover/cgbfwydeon88sq149xpc.jpg",
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
