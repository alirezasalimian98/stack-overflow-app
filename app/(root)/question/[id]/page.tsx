import Answer from "@/components/form/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metrics from "@/components/shared/Metrics";
import ParsHTML from "@/components/shared/ParsHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { GetQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }: any) => {
  const result = await GetQuestionById({ questionId: params.id });

  const { userId: clerkId } = await auth();

  // let mongoUser;

  // if (clerkId) {
  //   mongoUser = await getUserById({ clerkId });
  // }

  const mongoUser = await getUserById({ clerkId });

  return (
    <>
      <div className="flex-start flex-col w-full">
        <div
          className="flex flex-col-reverse w-full justify-between
         gap-5 sm:flex-row sm:items-center sm:gap-2"
        >
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="profile avatar"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type={"Question"}
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metrics
          imgUrl="/assets/icons/clock.svg"
          alt="clock image"
          value={`asked ${getTimeStamp(result.createdAt)}`}
          title=""
          textStyle="small-medium text-dark400_light800"
        />
        <Metrics
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(result.answers.length)}
          title="answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metrics
          imgUrl="/assets/icons/eye.svg"
          alt="like"
          value={formatNumber(result.views)}
          title="Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
      <ParsHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-1">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;
