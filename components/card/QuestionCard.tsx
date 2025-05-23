import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metrics from "../shared/Metrics";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

export interface QuestionCardType {
  _id: string;
  title: string;
  tags: { _id: string; name: string }[];
  author: { _id: string; name: string; picture: string; clerkId: string };
  views: number;
  answers: Array<object>;
  upvotes: string[];
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  views,
  answers,
  upvotes,
  createdAt,
  clerkId,
}: QuestionCardType) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 mb-4">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className=" flex-between mt-6 w-full flex-wrap gap-3">
        <Metrics
          imgUrl={author.picture}
          alt="like"
          value={author.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          textStyle="small-medium text-dark400_light700"
          isAuthor
          href={`/profile/${author._id}`}
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metrics
            imgUrl="/assets/icons/like.svg"
            alt="like"
            value={formatNumber(upvotes.length)}
            title="Votes"
            textStyle="small-medium text-dark400_light800"
          />
          <Metrics
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(answers.length)}
            title="answers"
            textStyle="small-medium text-dark400_light800"
          />
          <Metrics
            imgUrl="/assets/icons/eye.svg"
            alt="like"
            value={formatNumber(views)}
            title="Views"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
