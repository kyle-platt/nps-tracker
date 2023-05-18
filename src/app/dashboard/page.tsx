import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import ParkTile from "./parkTile";
import Header from "../header/header";

export interface Park {
  id: string;
  name: string;
  state: string;
  rel_id?: string;
  hasVisited: boolean;
  src: string;
}

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({ headers, cookies });

  const session = await supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      // If not logged in, redirect to sign in
      if (!Boolean(session)) {
        redirect("/signin");
      }

      return session;
    });

  const { data: parks = [] } = await supabase.from("parks").select();

  const { data: visitedParks = [] } = await supabase
    .from("parks_user_rel")
    .select();

  const parksWithVisits = parks?.map((park) => {
    const visitedPark = visitedParks?.find(
      (visitedPark) => visitedPark.park_id === park.id
    );
    return {
      ...park,
      rel_id: visitedPark?.id,
      hasVisited: !!visitedPark,
    };
  }) as Park[];

  return (
    <main className="flex items-center flex-col h-full bg-tan px-4">
      {/* @ts-expect-error Server Component */}
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Dashboard
      </h1>
      <p className="py-2 mb-8 text-gray-700 w-full text-center sticky top-0 bg-tan z-20">
        {visitedParks?.length} / {parks?.length} visited
      </p>
      <div className="px-1 mb-6 grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {parksWithVisits?.map((park) => (
          <ParkTile key={park.id} park={park} user_id={session!.user.id} />
        ))}
      </div>
    </main>
  );
}
