import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import ParkTile from "./parkTile";
import Header from "../header/header";
import { auth } from "../firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export interface Park {
  id: string;
  name: string;
  state: string;
  rel_id?: string;
  hasVisited: boolean;
  src: string;
}

export default async function Home() {
  console.log(auth.currentUser);
  // useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      console.log("uid", uid);
    } else {
      // User is signed out
      // ...
      console.log("user is logged out");
    }
  });
  // }, []);

  // auth.onAuthStateChanged
  // const supabase = createServerComponentSupabaseClient({ headers, cookies });

  // const session = await supabase.auth
  //   .getSession()
  //   .then(({ data: { session } }) => {
  //     // If not logged in, redirect to sign in
  //     if (!Boolean(session)) {
  //       redirect("/signin");
  //     }

  //     return session;
  //   });

  // const { data: parks = [] } = await supabase.from("parks").select();

  // const { data: visitedParks = [] } = await supabase
  //   .from("parks_user_rel")
  //   .select();

  // const parksWithVisits = parks?.map((park) => {
  //   const visitedPark = visitedParks?.find(
  //     (visitedPark) => visitedPark.park_id === park.id
  //   );
  //   return {
  //     ...park,
  //     rel_id: visitedPark?.id,
  //     hasVisited: !!visitedPark,
  //   };
  // }) as Park[];

  return (
    <main className="flex items-center flex-col h-full bg-tan px-4">
      {/* @ts-expect-error Server Component */}
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Dashboard
      </h1>
      <p className="text-gray-700 text-center mb-4">
        Click the parks you have visited to track your progress.{" "}
        {JSON.stringify(auth.currentUser)}
      </p>
      {/* <div className="py-2 mb-6 text-gray-800 w-full text-center sticky top-0 bg-tan z-20 flex justify-center">
        {visitedParks?.length} / {parks?.length} visited
      </div>
      <div className="px-1 mb-6 grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {parksWithVisits?.map((park) => (
          <ParkTile key={park.id} park={park} user_id={session!.user.id} />
        ))}
      </div> */}
    </main>
  );
}
