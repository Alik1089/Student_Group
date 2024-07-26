import AdminProfile from "@/app/components/admin/AdminProfile";
import type { Metadata } from "next";

export default function IndexPage() {
  return <AdminProfile />;
}

export const metadata: Metadata = {
  title: "AdminProfile",
};
