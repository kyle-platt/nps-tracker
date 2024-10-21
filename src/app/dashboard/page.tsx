"use client";

import Header from "../header/header";
import { auth, db } from "../firebase";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import ParkTile from "./parkTile";

export interface Park {
  id: string;
  name: string;
  location: string;
  src: string;
}

const getParks = () => {
  return getDocs(collection(db, "parks")).then((data) => {
    const arr = [] as Park[];
    data.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() } as Park);
    });

    return arr;
  });
};

export default function Home() {
  const router = useRouter();
  const [parks, setParks] = useState<Park[]>([]);
  const [visitedParks, setVisitedParks] = useState<string[]>([]);
  const docRef = useRef<DocumentReference<DocumentData, DocumentData> | null>(
    null
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        docRef.current = doc(db, "user", user.uid);
        getDoc(docRef.current).then((docSnap) => {
          if (docSnap.exists()) {
            setVisitedParks(docSnap.data().visitedParks);
          } else {
            setDoc(docRef.current!, { visitedParks });
          }
        });
      } else {
        router.replace("/signin");
      }
    });
  }, []);

  useEffect(() => {
    getParks().then((parkList) => setParks(parkList));
  }, []);

  const handleCheck = async (parkId: string, hasVisited: boolean) => {
    const newArr = hasVisited
      ? visitedParks.filter((p) => p !== parkId)
      : [...visitedParks, parkId];

    setDoc(docRef.current!, { visitedParks: newArr }).then(() => {
      getDoc(docRef.current!).then((docSnap) => {
        if (docSnap.exists()) {
          setVisitedParks(docSnap.data().visitedParks);
        }
      });
    });
  };

  return (
    <main className="flex items-center flex-col h-full bg-tan px-4">
      <Header />
      <h1 className="text-4xl mt-8 mb-2 text-gray-800 text-center">
        Dashboard
      </h1>
      <p className="text-gray-700 text-center mb-4">
        Click the parks you have visited to track your progress.
      </p>
      <div className="py-2 mb-6 text-gray-800 w-full text-center sticky top-0 bg-tan z-20 flex justify-center">
        {visitedParks.length} / {parks?.length} visited
      </div>
      <div className="px-1 mb-6 grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {parks?.map((park) => (
          <ParkTile
            key={park.id}
            park={park}
            hasVisited={
              visitedParks ? visitedParks.some((id) => id === park.id) : false
            }
            handleCheck={handleCheck}
          />
        ))}
      </div>
    </main>
  );
}
