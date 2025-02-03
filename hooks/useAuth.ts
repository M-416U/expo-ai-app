import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          await AsyncStorage.setItem(
            "supabase_session",
            JSON.stringify(session)
          );
        } else if (event === "SIGNED_OUT") {
          await AsyncStorage.removeItem("supabase_session");
        }
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check existing session
    const checkSession = async () => {
      // Check stored session first
      const storedSession = await AsyncStorage.getItem("supabase_session");
      if (storedSession) {
        const parsedSession = JSON.parse(storedSession);
        await supabase.auth.setSession(parsedSession);
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkSession();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};
