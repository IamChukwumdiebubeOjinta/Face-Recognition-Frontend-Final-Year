import { Button } from "../components/shared";
import { useUserContext } from "../context";

interface ListUsersPageProps {
  onClose: () => void;
}

const ListUsersPage: React.FC<ListUsersPageProps> = ({ onClose }) => {
  const { users } = useUserContext();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-6 bg-white rounded-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">List Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="mb-4">
            {users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ListUsersPage;