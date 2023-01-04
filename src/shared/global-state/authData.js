import { atom, useAtom } from "jotai";
import supabase from "../../config/supabase";

export const isAuthenticatedAtom = atom(
  JSON.parse(window.localStorage.getItem("sb-vwpssjxcemvsutqjqxau-auth-token"))
    ?.user?.aud === "authenticated" || false
);

export const authDataAtom = atom(null);
export const getAuthDataAtom = atom(
  (get) => get(authDataAtom),
  async (_get, set) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq(
        "auth_id",
        JSON.parse(
          window.localStorage.getItem("sb-vwpssjxcemvsutqjqxau-auth-token")
        )?.user?.id
      );
    set(authDataAtom, data ? data[0] : {});
  }
);
