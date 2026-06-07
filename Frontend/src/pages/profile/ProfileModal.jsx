import MemberProfile from "./MemberProfile";
import TrainerProfile from "./TrainerProfile";
import OwnerProfile from "./OwnerProfile";

export default function ProfileModal(props) {

  const { user, showProfile } = props;

  if (!showProfile) return null;

  if (user?.role === "member") {
    return <MemberProfile {...props} />;
  }

  if (user?.role === "trainer") {
    return <TrainerProfile {...props} />;
  }

  if (user?.role === "owner") {
    return <OwnerProfile {...props} />;
  }

  return null;
}