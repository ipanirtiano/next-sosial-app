-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_id_post_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_id_post_fkey";

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_post_fkey" FOREIGN KEY ("id_post") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
