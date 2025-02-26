import { Question } from "@/components/form/Question";
import { GetQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const { userId } = await auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });

  const result = await GetQuestionById({ questionId: params.id });
  console.log(result);

  return (
    <>
      <h3 className="h1-bold text-dark100_light900">Edit Question</h3>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default page;
