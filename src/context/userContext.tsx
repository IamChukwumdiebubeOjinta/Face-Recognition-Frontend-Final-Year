/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from "react";
import { addUser, updateUser, deleteUser } from "../api";

export interface User {
  id: string;
  name: string;
  file: string | null;
  client_id?: string;
  user_type?: string;
  dept?: string;
}

interface UserContextType {
  users: User[];
  addUser: (formData: FormData) => Promise<void>;
  updateUser: (client_id: string, data: Partial<User>) => Promise<void>;
  deleteUser: (client_id: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    // Fetch the list of users from your API and update state
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addAUser = async (formData: FormData) => {
    try {
      await addUser(formData);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  const updateUser = async (client_id: string, data: Partial<User>) => {
    try {
      await updateFace(client_id, data);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const deleteUser = async (client_id: string) => {
    try {
      await deleteFace(client_id);
      await fetchUsers();
    } catch (error) {
      console.error("Failed to remove user", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, addAUser, updateUser, deleteUser, fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
