import type { Metadata } from "next";
import Profile from "../components/profile/Profile";

export default function IndexPage() {
  return <Profile />;
}

export const metadata: Metadata = {
  title: "Profile",
};
