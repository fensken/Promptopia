"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const MyProfile = () => {
	const { data: session } = useSession();

	const [myPosts, setMyPosts] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch(`/api/users/${session?.user.id}/posts`);
		const data = await response.json();

		console.log(response,"fdsafasdf");

		setMyPosts(data);
	};

	useEffect(() => {
		if (session?.user.id) fetchPosts();
	},[session?.user.id]);

	const handleEdit = () => {};

	const handleDelete = () => {};

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page"
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
