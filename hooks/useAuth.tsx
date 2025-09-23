import { AuthType } from "@/components/types/types";
import { auth } from "@/firebase";
import * as SplashScreen from "expo-splash-screen";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type AuthUserType = {
  email: string | null;
  password: string | null;
  authType: AuthType;
};

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  signUpOrLogin: ({ email, password, authType }: AuthUserType) => void;
  error: string | null | unknown;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  signUpOrLogin({ email, password, authType }) {},
  error: null,
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true); // set loading state
  const [error, setError] = useState<string | null | unknown>(null);

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

  const signUpOrLogin = async ({ email, password, authType }: AuthUserType) => {
    try {
      setLoadingInitial(true);
      if (!email || !password) {
        setError("Email or password is empty");
        console.log("Null value detected");
        setLoadingInitial(false);
        return;
      }
      const response =
        authType === "signUp"
          ? await createUserWithEmailAndPassword(auth, email, password)
          : await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error);
    } finally {
      setLoadingInitial(false);
    }
  };

  const memedValues = useMemo(
    () => ({ user, setUser, signUpOrLogin, error }),
    [user, error]
  );

  if (loadingInitial) {
    return null;
  }
  return (
    <AuthContext.Provider value={memedValues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
