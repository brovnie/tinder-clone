import { Image, Text, View } from "react-native";
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
export default function HomeScreen() {
  return (
    <View className="flex-1">
      <Swiper
        cards={DUMMY_DATA}
        containerStyle={{ borderRadius: 20 }}
        renderCard={(card) => {
          return (
            <View
              key={card.firstName}
              className="bg-white dark:bg-slate-800 h-3/4 w-full shadow-lg rounded-xl relative"
            >
              <Image
                source={{ uri: card.photoURL }}
                className="w-full h-full rounded-2xl absolute top-0 left-0"
              />
              <Text className="dark:text-white">{card.firstName}</Text>
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
      />
    </View>
  );
}
