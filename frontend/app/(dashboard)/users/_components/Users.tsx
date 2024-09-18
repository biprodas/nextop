"use client";

import useGetUsers from "../use-get-users";

const Users = () => {
  const { data, error, isLoading } = useGetUsers();

  console.log("data", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="border p-3 my-3">
      <h4>User List (React Query (CSR))</h4>
      <ul>
        {data?.data.map((user, idx) => (
          <li key={user.id}>
            {idx + 1}. {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
