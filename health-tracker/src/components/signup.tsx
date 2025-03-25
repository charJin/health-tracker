import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const auth = UserAuth();
	const navigate = useNavigate();
	if (!auth) return <div>Loading...</div>;
	const { session, signUpNewUser } = auth;
	console.log("Current Section: ", session);

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // stop page from reload
		setLoading(true);
		try {
			const result = await signUpNewUser({ email, password });

			if (result.success) {
				navigate("/dashboard");
			}
		} catch {
			setError("an error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full bg-white-gray-green flex items-center justify-center px-4">
			<div className="bg-white shadow-md rounded-lg p-10 w-full max-w-sm text-center">
				<h1 className="text-black-green text-4xl font-bold mb-2">Welcome!</h1>
				<p className="text-main-green mb-6">Ready to start tracking?</p>

				<form onSubmit={handleSignUp} className="flex flex-col gap-4 text-left">
					<div>
						<label className="block mb-1 font-medium text-black-green">
							Email
						</label>
						<input
							type="email"
							className="w-full border border-main-green rounded-md p-2 focus:outline-none"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium text-black-green">
							Password
						</label>
						<input
							type="password"
							className="w-full border border-main-green rounded-md p-2 focus:outline-none"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="bg-main-green text-white py-2 rounded-md hover:bg-bright-green transition font-medium"
					>
						Get Started
					</button>

					{/* Sign In (Navigation Button) */}
					<button
						type="button"
						// onClick={handleSignInClick}
						className="bg-accent-green text-black-green py-2 rounded-md hover:bg-bright-green hover:text-white transition font-medium"
					>
						Sign In
					</button>

					{error && (
						<p className="text-red-500 text-sm pt-2 text-center">{error}</p>
					)}
				</form>
			</div>
		</div>
	);
};
// 		<div>
// 			<form onSubmit={handleSignUp} className="max-w-md m-auto pt-24">
// 				<h2 className="font-bold pb-2">Sign up today!</h2>
// 				<p>
// 					Already have an account? <Link to="/signin">Sign in!</Link>
// 				</p>
// 				<div className="flex flex-col py-4">
// 					<input
// 						onChange={(e) => setEmail(e.target.value)}
// 						placeholder="Email"
// 						className="p-3 mt-2"
// 						type="email"
// 						name=""
// 						id=""
// 					/>
// 					<input
// 						onChange={(e) => setPassword(e.target.value)}
// 						placeholder="Password"
// 						className="p-3 mt-2"
// 						type="password"
// 						name=""
// 						id=""
// 					/>
// 					<button type="submit" disabled={loading} className="mt-6 w-full">
// 						Sign up
// 					</button>
// 					{error && <p className="text-red-600 text-center pt-4">{error}</p>}
// 				</div>
// 			</form>
// 		</div>
// 	);
// };

export default Signup;
