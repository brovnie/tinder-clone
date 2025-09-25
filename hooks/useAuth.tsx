import { AuthType } from "@/components/types/types";
import { auth, db } from "@/firebase";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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

type UserProfilAuthData = {
  displayName?: string;
  photoURL?: string;
};

type UserAuthData = {
  photoURL?: string;
  occupation?: string;
  age?: number;
};

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  signUpOrLogin: ({ email, password, authType }: AuthUserType) => void;
  error: string | null;
  signOutUser: () => void;
  updateUserAuthProfile: ({
    displayName,
    photoURL,
  }: UserProfilAuthData) => void;
  updateUserProfile: ({ photoURL, occupation, age }: UserAuthData) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  signUpOrLogin: ({ email, password, authType }) => {},
  error: null,
  updateUserAuthProfile: ({ displayName, photoURL }) => {},
  signOutUser: () => {},
  updateUserProfile: ({ photoURL, occupation, age }) => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(true); // set loading state
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccesMessage] = useState<string | null>(null);
  const router = useRouter();
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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error has occured.");
      }
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
        if (!email && !password) {
          setError("Please fill the inputs.");
        } else if (!email) {
          setError("Email is empty. Please fill in the email.");
        } else {
          setError("Password is empty. Please fill in the password input.");
        }
        setLoadingInitial(false);
        return;
      }
      const response =
        authType === "signUp"
          ? await createUserWithEmailAndPassword(auth, email, password)
          : await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error has occured.");
      }
    } finally {
      setLoadingInitial(false);
    }
  };

  const updateUserAuthProfile = (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!user) {
      setError("User is not authenticated.");
      return;
    }
    updateProfile(user, { ...data })
      .then(() => {
        console.log("Profile updated");
        setSuccesMessage("Profile updated!");
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error has occured.");
        }
      });
  };

  const updateUserProfile = ({ photoURL, occupation, age }: UserAuthData) => {
    if (user) {
      const data: { [key: string]: any } = {};
      photoURL && (data["photoURL"] = photoURL);
      occupation && (data["occupation"] = occupation);
      age && (data["age"] = age);
      console.log("you here");
      setDoc(
        doc(db, "users", user.uid),
        {
          id: user.uid,
          displayName: user.displayName,
          ...data,
          timestemp: serverTimestamp(),
        },
        { merge: true }
      )
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Unknown error has occured.");
          }
        });
    }
  };

  const signOutUser = () => {
    signOut(auth).catch((error) => {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error has occured.");
      }
    });
  };

  const memedValues = useMemo(
    () => ({
      user,
      setUser,
      signUpOrLogin,
      updateUserAuthProfile,
      error,
      successMessage,
      signOutUser,
      updateUserProfile,
    }),
    [user, error, successMessage]
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
