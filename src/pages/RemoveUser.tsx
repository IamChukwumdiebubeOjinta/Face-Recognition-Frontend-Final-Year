// pages/AddUserPage.tsx
import React, { useState } from "react";
import { useUserContext } from "../context";
import { Button, Input } from "../components/shared";

interface AddUserPageProps {
  onClose: () => void;
}

const AddUserPage: React.FC<AddUserPageProps> = ({ onClose }) => {
  const { addUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    if (name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addUser({ id: Date.now().toString(), name, email });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-6 bg-white rounded-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              error={errors.name}
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              error={errors.email}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add User</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;