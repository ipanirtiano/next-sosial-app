import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma_db";

// route delete post
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const response = await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Post Deleted successfully.." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Oops something when wrong! ${error}` },
      { status: 500 }
    );
  }
};
