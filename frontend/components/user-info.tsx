interface UserInfoProps {
  user?: { name: string };
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div>
      <h4>{label}</h4>
      <div>Name: {user?.name}</div>
    </div>
  );
};
