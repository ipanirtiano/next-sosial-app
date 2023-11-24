import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// route upload image
export const POST = async (request: Request) => {
  // get file formData
  const dataFile = await request.formData();
  const file: File | null = dataFile.get("file") as unknown as File;

  // set file name
  const fileName = file.name;
  const result = fileName.split(".");
  // set new file name
  const newFileName = Date.now() + "." + result[1];

  // validate file
  if (!file) {
    return NextResponse.json({ message: "No content" }, { status: 500 });
  }

  const byteData = await file.arrayBuffer();
  const buffer = Buffer.from(byteData);

  // set path
  const path = `https://next-sosial-app.vercel.app/public/upload/${newFileName}`;
  // write file to the path
  await writeFile(path, buffer);

  // return file name
  return NextResponse.json({ fileName: newFileName }, { status: 200 });
};
