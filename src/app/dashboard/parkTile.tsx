"use client";

import Image from "next/image";
import { Park } from "./parkContent";
import debounce from "lodash.debounce";

interface Props {
  park: Park;
  hasVisited: boolean;
  handleCheck: (_parkId: string, _hasVisited: boolean) => Promise<void>;
}

export default function ParkTile({ park, hasVisited, handleCheck }: Props) {
  return (
    <div className="relative">
      <input
        id={park.id}
        type="checkbox"
        value={park.id}
        checked={false}
        onChange={debounce(() => handleCheck(park.id, hasVisited), 500)}
        aria-label={park.name}
        className="cursor-pointer h-full w-full absolute m-0 z-10 opacity-0 top-0 left-0 peer"
      />
      <Image
        src={`/parks/${park.src}`}
        width={150}
        height={200}
        alt={park.name}
        className={`peer-focus-visible:outline outline-2 outline-blue-800 ${
          hasVisited ? "" : "grayscale blur-xs"
        }`}
      />
    </div>
  );
}
