import { Session, AuthError, AuthResponse } from "@supabase/supabase-js";

export type AuthContextType = {
	session: Session | null;
	signUpNewUser: (params: { email: string; password: string }) => Promise<{
		success: boolean;
		error?: AuthError | unknown;
		data?: AuthResponse["data"];
	}>;

	signInUser: (params: { email: string; password: string }) => Promise<{
		success: boolean;
		error?: AuthError | unknown;
		data?: AuthResponse["data"];
	}>;

	signOut: () => Promise<{
		success: boolean;
		error?: AuthError | unknown;
	}>;
};
