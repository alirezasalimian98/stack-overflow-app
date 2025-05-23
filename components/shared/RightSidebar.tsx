import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getTopPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getTopPopularTags();

  return (
    <section
      className="background-light900_dark200
    light-border custom-scrollbar
    sticky right-0 top-0 flex flex-col
    h-screen w-[350px] overflow-y-auto
    border-l p-6 pt-36 shadow-light-300
    dark:shadow-none max-xl:hidden "
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="flex flex-col mt-7 w-full gap-[30px]">
          {hotQuestions.map((question) => {
            return (
              <Link
                className="flex cursor-pointer items-center justify-between gap-7"
                key={question._id}
                href={`/question/${question._id}`}
              >
                <p className="body-medium text-dark500_light700">
                  {question.title}
                </p>
                <Image
                  src={"/assets/icons/chevron-right.svg"}
                  alt="arrow right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.numberOfQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
