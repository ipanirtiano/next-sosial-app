import { post } from "@prisma/client";
import LayoutsHome from "../components/LayoutHome";
import Post from "../components/Post";
import Share from "../components/Share";
import Stories from "../components/Stories";
import prisma from "@/prisma/prisma_db";

const getAllPost = async () => {
  try {
    const response = await prisma.post.findMany({
      include: {
        User: true,
        comment: {
          include: { User: true },
        },
        like: true,
      },
      orderBy: { id: "desc" },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const Page = async () => {
  const dataPost = await getAllPost();

  return (
    <LayoutsHome>
      <Stories />
      <Share />
      {dataPost?.map((item: post, i: any) => {
        return <Post key={i} item={item} />;
      })}
    </LayoutsHome>
  );
};

export default Page;
