"use client";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse mt-12 justify-center items-center", className)}>
      {avatarUrls.map((url, index) => (
      <img
        key={index}
        className="h-10 w-10 rounded-full border-2 border-gray-600"
        src={url.imageUrl}
        width={40}
        height={40}
        alt={`Avatar ${index + 1}`}
      />
      ))}
      {(numPeople ?? 0) > 0 && (
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#de34eb] bg-white text-center text-xs font-medium text-[#de34eb]"
      >
        +{numPeople}
      </div>
      )}
    </div>
  );
};
