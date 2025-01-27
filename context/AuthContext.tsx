"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { createUserProfile, getUserRole } from "@/lib/firebase/auth";
import { ADMIN_EMAILS } from "@/lib/constants";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ role: string }>;
  signInWithGoogle: () => Promise<
    { role: string; isNewUser: boolean; user: User }
  >;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (ADMIN_EMAILS.includes(email)) {
      return { role: "admin" };
    }
    const role = await getUserRole(userCredential.user.uid);
    return { role };
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    // const additionalInfo = getAdditionalUserInfo(userCredential);
    // const isNewUser = additionalInfo?.isNewUser || false;

    // Check if admin
    if (ADMIN_EMAILS.includes(userCredential.user.email!)) {
      await createUserProfile(userCredential.user.uid, {
        email: userCredential.user.email!,
        name: userCredential.user.displayName ||
          userCredential.user.email!.split("@")[0],
        role: "admin",
      });
      return { role: "admin", isNewUser: false, user: userCredential.user };
    }

    // Check if existing user
    const userRole = await getUserRole(userCredential.user.uid);

    if (!userRole) {
      // This is a new user, don't create profile yet
      return {
        role: null,
        isNewUser: true,
        user: userCredential.user,
      };
    }

    return {
      role: userRole,
      isNewUser: false,
      user: userCredential.user,
    };
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUserRole(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Check if user is an admin by email
        if (ADMIN_EMAILS.includes(user.email!)) {
          await createUserProfile(user.uid, {
            email: user.email!,
            name: user.displayName || user.email!.split("@")[0],
            role: "admin",
          });
          setUserRole("admin");
        } else {
          const role = await getUserRole(user.uid);
          setUserRole(role);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        signIn,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
