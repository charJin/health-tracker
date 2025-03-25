import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { Session } from "@supabase/supabase-js";
import { AuthContextType } from "./auth.types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }) => {
	const [session, setSession] = useState<Session | null>(null);

	// Sign up
	const signUpNewUser = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: email,
				password: password,
			});

			if (error) {
				// Supabase errors
				console.error("Sign up Error: ", error);
				return { success: false, error };
			}
			console.log("Sign up successful: ", data);
			return { success: true, data };
		} catch (error) {
			console.error("Unexpected Sign up Error: ", error);
			return { success: false, error };
		}
	};

	// Sign in
	const signInUser = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				// Supabase errors
				console.error("Sign in Error: ", error);
				return { success: false, error };
			}
			console.log("Sign in successful: ", data);
			return { success: true, data };
		} catch (error) {
			console.error("Unexpected Sign in Error: ", error);
			return { success: false, error };
		}
	};

	// Listen to session change
	useEffect(() => {
		// Get the current session when component first mounts
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		// Set up a listener for future auth state changes
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session); // update session when user logs in / out
		});
	}, []);

	// Sign out
	const signOut = () => {
		const { error } = supabase.auth.signOut();
		if (error) {
			console.error("Sign out Error: ", error);
		}
	};
	return (
		<AuthContext.Provider
			value={{ session, signUpNewUser, signInUser, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
