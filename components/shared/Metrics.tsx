import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricsType {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyle?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metrics = ({
  imgUrl,
  alt,
  value,
  title,
  textStyle,
  href,
  isAuthor,
}: MetricsType) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return <Link href={"/"}>{metricContent}</Link>;
  }
  return <div className="flex-wrap flex-center gap-1">{metricContent}</div>;
};

export default Metrics;
