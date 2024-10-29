"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

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
        onChange={() => {}}
        value=""
        placeholder={placeholder}
        className="paragraph-regular no-focus
         placeholder background-light800_darkgradient
          border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearchbar;
