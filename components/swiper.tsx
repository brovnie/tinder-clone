import generateIds from "@/app/lib/generateId";
import { Colors } from "@/constants/theme";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Image, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Card } from "./types/types";

const DUMMY_DATA = [
  {
    firstName: "Marlena",
    lastName: "Unknown",
    occupation: "Front end developer",
    photoURL:
      "https://images.unsplash.com/photo-1558467612-d1dd65c7ede7?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 30,
  },
  {
    firstName: "Joe",
    lastName: "Doe",
    occupation: "Social worker",
    photoURL:
      "https://plus.unsplash.com/premium_photo-1683141256844-9b6a7b00eddd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 30,
  },
  {
    firstName: "John",
    lastName: "Smith",
    occupation: "police officer",
    photoURL:
      "https://images.unsplash.com/photo-1529478490015-00f1a2f8f5cd?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    age: 30,
  },
];

type CardSwiperProps = {
  setSwipeRef: React.Dispatch<React.SetStateAction<Swiper<Card> | null>>;
};

type ProfileCard = {
  id: string;
  firstName: string;
  photoURL: string;
  occupation: string;
  age: string;
};

const CardSwiper = ({ setSwipeRef }: CardSwiperProps) => {
  const colorScheme = useColorScheme();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState<ProfileCard[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (swipeRef.current) {
      setSwipeRef(swipeRef.current);
    }
  }, [swipeRef]);
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchCards = async () => {
      if (!user) return;

      const passedSnapshot = await getDocs(
        collection(db, "users", user.uid, "passes")
      );
      const swipedSnapshot = await getDocs(
        collection(db, "users", user.uid, "swipes")
      );

      const passedUserIds = passedSnapshot.docs.map((doc) => doc.id);
      const swipedUserIds = swipedSnapshot.docs.map((doc) => doc.id);

      let excludedUserIds = [...passedUserIds, ...swipedUserIds];

      if (excludedUserIds.length === 0) {
        excludedUserIds = ["__none__"];
      }

      unsubscribe = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...excludedUserIds])
        ),
        (snapshot) => {
          const fetchedProfiles = snapshot.docs
            .filter((doc) => doc.id !== user?.uid)
            .map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                firstName: data.displayName,
                photoURL: data.photoURL,
                occupation: data.occupation,
                age: data.age,
              } as ProfileCard;
            });

          setProfiles(fetchedProfiles);
        }
      );
    };

    fetchCards();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  //Reject profile 😔
  const swipeLeft = (cardIndex: number) => {
    const userSwipped = profiles[cardIndex];
    if (user) {
      setDoc(doc(db, "users", user?.uid, "passes", userSwipped.id), {
        id: userSwipped.id,
      });
    }
  };

  //It's a match ❤️
  const swipeRight = async (cardIndex: number) => {
    const userSwipped = profiles[cardIndex];
    if (!user) return;

    setDoc(doc(db, "users", user?.uid, "swipes", userSwipped.id), {
      id: userSwipped.id,
    });

    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    getDoc(doc(db, "users", userSwipped.id)).then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        setDoc(doc(db, "matches", generateIds(user.uid, userSwipped.id)), {
          users: {
            [user.uid]: user.uid,
            [userSwipped.id]: userSwipped.id,
          },
          usersMatched: [user.uid, userSwipped.id],
          temestemp: serverTimestamp(),
        });
      }
      router.navigate({
        pathname: "/match",
        params: {
          loggedInPhoto: loggedInProfile?.photoURL,
          swippedUserName: userSwipped.firstName,
          swippedUserPhoto: userSwipped.photoURL,
        },
      });
    });
  };

  return (
    <>
      {profiles.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl font-bold text-slate-400 dark:text-slate-600">
            No Profiles found 😔
          </Text>
        </View>
      ) : (
        <Swiper
          ref={swipeRef}
          cards={profiles}
          containerStyle={{ borderRadius: 20, padding: 0, margin: 0 }}
          renderCard={(card) => {
            return (
              card && (
                <View
                  key={card.firstName}
                  className="bg-white dark:bg-slate-800 h-3/4 w-full shadow-lg rounded-2xl  relative"
                >
                  <Image
                    source={{ uri: card.photoURL }}
                    className="w-full h-full rounded-2xl absolute top-0 left-0"
                  />
                  <View className="w-full h-20 bg-white dark:bg-slate-600 absolute bottom-0 items-center justify-between flex-row px-6 py-2 rounded-b-2xl ">
                    <View>
                      <Text className="dark:text-white text-xl font-bold">
                        {card.firstName}
                      </Text>
                      <Text className="dark:text-white">{card.occupation}</Text>
                    </View>
                    <Text className="dark:text-white text-2xl font-bold">
                      {card.age}
                    </Text>
                  </View>
                </View>
              )
            );
          }}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={5}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
            left: {
              element: <Text className="text-5xl text-white">NOPE 🙀</Text>,
              title: "NOPE",
              style: {
                label: {
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  padding: 20,
                  backgroundColor:
                    Colors[colorScheme ?? "light"].cardWrapperNope,
                  height: "75%",
                  borderRadius: 16,
                },
              },
            },
            right: {
              element: <Text className="text-5xl text-white">MATCH❤️</Text>,
              title: "NOPE",
              style: {
                label: {
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: 20,
                  backgroundColor:
                    Colors[colorScheme ?? "light"].cardWrapperMatch,
                  height: "75%",
                  borderRadius: 16,
                },
              },
            },
          }}
        />
      )}
    </>
  );
};

export default CardSwiper;
