import { auth } from "@/firebase";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true); // set loading state

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(() => {
      console.log("error splash screen show");
    });

    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!loadingInitial) {
      SplashScreen.hideAsync().catch(() => {
        console.log("Error splash screen hide");
      });
    }
  }, [loadingInitial]);

  if (loadingInitial) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
