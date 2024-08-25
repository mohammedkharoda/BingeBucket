// components/NavbarWrapper.tsx (Server Component)
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "../components/Nav";

export default async function NavbarWrapper() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return <Navbar isUserAuthenticated={isUserAuthenticated} />;
}
