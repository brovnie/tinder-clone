import { Colors } from "@/constants/theme";
import { Image, Text, useColorScheme, View } from "react-native";
import Swiper from "react-native-deck-swiper";

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
const CardSwiper = () => {
  const colorScheme = useColorScheme();
  return (
    <Swiper
      cards={DUMMY_DATA}
      containerStyle={{ borderRadius: 20 }}
      renderCard={(card) => {
        return (
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
        );
      }}
      onSwiped={(cardIndex) => {
        console.log(cardIndex);
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
