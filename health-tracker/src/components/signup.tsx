import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");

	const auth = UserAuth();
	const navigate = useNavigate();
	if (!auth) return <div>Loading...</div>;
	const { session, signUpNewUser } = auth;
	console.log("Current Section: ", session);

	const handleSignUp = async (e) => {
		e.preventDefault(); // stop page from reload
		setLoading(true);
		try {
			const result = await signUpNewUser({ email, password });

			if (result.success) {
				navigate("/dashboard");
			}
		} catch (error) {
			setError("an error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
				<h2 className="font-bold pb-2">Sign up today!</h2>
				<p>
					Already have an account? <Link to="/signin">Sign in!</Link>
				</p>
				<div className="flex flex-col py-4">
					<input
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="p-3 mt-2"
						type="email"
						name=""
						id=""
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						className="p-3 mt-2"
						type="password"
						name=""
						id=""
					/>
					<button type="submit" disabled={loading} className="mt-6 w-full">
						Sign up
					</button>
					{error && <p className="text-red-600 text-center pt-4">{error}</p>}
				</div>
			</form>
		</div>
	);
};

export default Signup;
