import { db } from "@/firebase";
import { useAuth } from "@/hooks/useAuth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import ChatRow from "./chat-row";
import { MatchProfile } from "./types/types";

const ChatList = () => {
  const [matches, setMatches] = useState<MatchProfile[] | []>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) => {
        const usersIds = snapshot.docs
          .map((doc) => {
            const matchedUsers: string[] = doc.data().usersMatched;
            return matchedUsers.find((id) => id !== user.uid);
          })
          .filter(Boolean);
        const getProfiles = async () => {
          if (!usersIds.length) {
            console.log("users ids not found");
            setMatches([]);
            return;
          }
          const q = query(
            collection(db, "users"),
            where("__name__", "in", usersIds)
          );
          const profilesSnapshot = await getDocs(q);
          const userProfiles = profilesSnapshot.docs.map((doc) =>
            doc.data()
          ) as [];
          setMatches(userProfiles);
        };
        getProfiles();
      }
    );
  }, [user]);

  return (
    <View className="flex-1">
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatRow details={item} />}
          className="h-full w-full"
        />
      ) : (
        <Text className="text-slate-400 dark:text-slate-700 text-3xl">
          No matches at this moment.
        </Text>
      )}
    </View>
  );
};

export default ChatList;
