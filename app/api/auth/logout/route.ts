import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const DELETE = (request: Request) => {
  try {
    // init cookies
    const cookieStore = cookies();
    // delete token from cookies
    const token = cookieStore.delete("access-token");

    return NextResponse.json(
      { message: "User logout successfully..." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "No content!",
      },
      { status: 403 }
    );
  }
};
