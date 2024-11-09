import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
    username: string;
  };
}
const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone  w-full max-xm:min-w-full xs:w-[260px]"
    >
      <article
        className="background-light900_dark200 light-border flex
       w-full flex-col items-center justify-center rounded-2xl border p-8"
      >
        <Image
          src={user.picture}
          alt="user profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h2-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag name={tag.name} _id={tag._id} key={tag._id} />
              ))}
            </div>
          ) : (
            <Badge>No tag found !</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
