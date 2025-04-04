import { getAnswers } from "@/lib/actions/answer.action";
import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParsHTML from "./ParsHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}
const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  console.log(result);
  return (
    <div className="mt-11">
      <div className="flex justify-between items-center">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result?.answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div
              className="mb-8 flex flex-col-reverse justify-between
               gap-5 sm:flex-row sm:items-center sm:gap-2"
            >
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-center gap-1 sm:items-center "
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light-400_light500 mt-0.5 line-clamp-1 ml-0.5">
                    answered {getTimeStamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type={"Answer"}
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>

            <ParsHTML data={answer.content} />
          </article>
        ))}
      </div>
      <div className="mt-10 w-full">
        <Pagination
          pageNumber={page ? +page : 1}
          isNext={result!.isNextAnswer}
        />
      </div>
    </div>
  );
};

export default AllAnswers;
