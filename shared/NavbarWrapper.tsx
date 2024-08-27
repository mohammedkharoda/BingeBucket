import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "../components/Nav";

export default async function NavbarWrapper() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <>
      <Navbar isUserAuthenticated={isUserAuthenticated} user={user} />
    </>
  );
}
