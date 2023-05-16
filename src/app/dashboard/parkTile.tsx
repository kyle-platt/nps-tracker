"use client";

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
    <div>
      <input
        id={park.id}
        type="checkbox"
        value={park.id}
        checked={park.hasVisited}
        onChange={handleCheck}
      />
      <label htmlFor={park.id}>{park.name}</label>
    </div>
  );
}
