"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface LocalSearchType {
  route: string;
  imgSrc: string;
  iconPosition: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  imgSrc,
  iconPosition,
  placeholder,
  otherClasses,
}: LocalSearchType) => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient
         flex min-h-[56px] grow items-center gap-4
          rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder={placeholder}
        className="paragraph-regular no-focus
         placeholder background-light800_darkgradient
          border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearchbar;
