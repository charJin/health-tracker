import { Session, AuthError, AuthResponse } from "@supabase/supabase-js";

export type AuthContextType = {
	session: Session | null;
	signUpNewUser: (
		email: string,
		password: string
	) => Promise<{
		success: boolean;
		error?: AuthError;
		data?: AuthResponse["data"];
	}>;
};
