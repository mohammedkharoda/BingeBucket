import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAvatar from "./UserAvatar";

export default async function UserAvatarServer() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <UserAvatar
      user={{ username: user?.username ?? "", picture: user?.picture ?? "" }}
    />
  );
}
