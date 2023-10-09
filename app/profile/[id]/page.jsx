"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUserName(data[0].creator.username);

      setPosts(data);
    };

    if (params.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={session?.user.id === params.id ? "My" : userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore their exceptional prompts`}
      data={posts}
    />
  );
};

export default UserProfile;
