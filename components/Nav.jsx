"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		setUpProviders();
	}, []);

	return (
		<nav className="w-full pt-3 mb-16 flex-between">
			<Link href={"/"} className="flex gap-2 flex-center">
				<Image
					src={"/assets/images/logo.svg"}
					width={30}
					height={30}
					alt="Promptopia Logo"
					className="object-contain"
				/>

				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className="hidden sm:flex">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href={"/create-prompt"} className="outline_btn">
							Create Prompt
						</Link>

						<button
							type="button"
							id="user-sign-out"
							onClick={signOut}
							className="black_btn"
						>
							Sign Out
						</button>

						<Link href={"/profile"}>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								alt="Profile"
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<button
										type="button"
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="black_btn"
									>
										Sign In
									</button>
								);
							})}
					</>
				)}
			</div>

			{/* Mobile Navigation */}
			<div className="relative flex sm:hidden">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							alt="Profile"
							onClick={() => setToggleDropdown((prev) => !prev)}
							className="rounded-full"
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href={"/profile"}
									onClick={() => setToggleDropdown(false)}
									className="dropdown_link"
								>
									My Profile
								</Link>

								<Link
									href={"/create-prompt"}
									onClick={() => setToggleDropdown(false)}
									className="dropdown_link"
								>
									Create Prompt
								</Link>

								<button
									type="button"
									id="user-mobile-sign-out"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className="w-full mt-5 black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => {
								return (
									<button
										type="button"
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="black_btn"
									>
										Sign In
									</button>
								);
							})}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
