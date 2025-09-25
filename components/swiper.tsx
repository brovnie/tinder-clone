import { Colors } from "@/constants/theme";
import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  // show modal if the user profile not set
  useLayoutEffect(() => {
    if (user) {
      const unsibscribe = onSnapshot(
        doc(db, "users", user?.uid),
        (snapshot) => {
          if (!snapshot.exists()) {
            router.push("/modal");
          }
        }
      );
      return () => unsibscribe();
    }
  }, []);

  useEffect(() => {
    const fetchCards = async () =>
      onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs
            .filter((doc) => {
              return doc.id !== user?.uid;
            })
            .map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                firstName: data.displayName,
                photoURL: data.photoURL,
                occupation: data.occupation,
                age: data.age,
              } as ProfileCard;
            })
        );
      });
    fetchCards();
  }, []);

  useEffect(() => {
    if (swipeRef.current) {
      setSwipeRef(swipeRef.current);
    }
  }, []);

  if (profiles.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-bold text-slate-400 dark:text-slate-600">
          No Profiles found 😔
        </Text>
      </View>
    );
  }

  return (
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
      onSwipedLeft={() => {
        console.log("Swipe Nope");
      }}
      onSwipedRight={() => {
        console.log("swipe match");
      }}
      onSwipedAll={() => {
        console.log("onSwipedAll");
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
              backgroundColor: Colors[colorScheme ?? "light"].cardWrapperNope,
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
              backgroundColor: Colors[colorScheme ?? "light"].cardWrapperMatch,
              height: "75%",
              borderRadius: 16,
            },
          },
        },
      }}
    />
  );
};

export default CardSwiper;
