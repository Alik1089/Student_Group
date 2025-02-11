import type { Metadata } from "next";
import Login from "./components/login/Login";

export default function IndexPage() {
  return <Login />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
