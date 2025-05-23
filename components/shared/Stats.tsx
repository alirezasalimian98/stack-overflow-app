import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface Props {
  totalAnswers: number;
  totalQuestions: number;
  badges: BadgeCounts;
  reputation: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}
const Stats = ({ totalAnswers, totalQuestions, badges, reputation }: Props) => {
  const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
    return (
      <div
        className="light-border background-light900_dark300 flex flex-wrap items-center 
        justify-starts gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200"
      >
        <Image src={imgUrl} alt={title} width={40} height={50} />
        <div>
          <p className="paragraph-semibold text-dark200_light900">{value}</p>
          <p className="body-medium text-dark400_light700">{title}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">
        Stats - {reputation}
      </h4>
      <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5">
        <div
          className="light-border background-light900_dark300 flex flex-wrap items-center 
        justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200"
        >
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <StatsCard
          imgUrl={"/assets/icons/gold-medal.svg"}
          value={badges.GOLD}
          title="Gold Badge"
        />
        <StatsCard
          imgUrl={"/assets/icons/silver-medal.svg"}
          value={badges.SILVER}
          title="Silver Badge"
        />
        <StatsCard
          imgUrl={"/assets/icons/bronze-medal.svg"}
          value={badges.BRONZE}
          title="Bronze Badge"
        />
      </div>
    </div>
  );
};

export default Stats;
