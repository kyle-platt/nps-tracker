"use client";

import Image from "next/image";
import { useSupabase } from "../supabase-provider";
import { Park } from "./page";
import { useRouter } from "next/navigation";

interface Props {
  park: Park;
  user_id: string;
}

export default function ParkTile({ park, user_id }: Props) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleCheck = async () => {
    if (park.hasVisited) {
      await supabase
        .from("parks_user_rel")
        .delete()
        .eq("id", park.rel_id)
        .then(() => router.refresh());
    } else {
      await supabase
        .from("parks_user_rel")
        .insert({ park_id: park.id, user_id })
        .then(() => router.refresh());
    }
  };

  return (
    <div className="relative">
      <input
        id={park.id}
        type="checkbox"
        value={park.id}
        checked={park.hasVisited}
        onChange={handleCheck}
        aria-label={park.name}
        className="cursor-pointer h-full w-full absolute m-0 z-10 opacity-0 top-0 left-0 peer"
      />
      <Image
        src={`/parks/${park.src}`}
        width={150}
        height={200}
        alt={park.name}
        className={`peer-focus-visible:outline outline-2 outline-blue-800 ${
          park.hasVisited ? "" : "grayscale blur-xs"
        }`}
      />
    </div>
  );
}
