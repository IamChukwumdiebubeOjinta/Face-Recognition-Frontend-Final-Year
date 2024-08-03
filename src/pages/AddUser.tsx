import React, { useState, useRef, useCallback, useEffect } from "react";
import { useUserContext } from "../context";
import { Button, Input } from "../components/shared";
import Webcam from "react-webcam";

interface AddUserPageProps {
  onClose: () => void;
}

const AddUserPage: React.FC<AddUserPageProps> = ({ onClose }) => {
  const { addAUser } = useUserContext();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [clientId, setClientId] = useState("");
  const [department, setDepartment] = useState("");
  const [invitedBy, setInvitedBy] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    clientId: "",
    type: "",
    department: "",
  });

  const formatId = (type) => {
    return type.toLowerCase() === "visitor"
      ? setClientId(Date.now().toString())
      : setClientId("");
  };

  useEffect(() => formatId(type), [type]);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      clientId: "",
      type: "",
      department: "",
    };

    if (name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (clientId.trim() === "") {
      newErrors.clientId = "Client ID is required";
      isValid = false;
    } else {
      if (
        type.toLowerCase() === "student" &&
        !/^2022\/\d{5}[A-Z]{3}$/.test(clientId)
      ) {
        newErrors.clientId = "Invalid Student ID format";
        isValid = false;
      } else if (type.toLowerCase() === "staff" && !/^\d{9}$/.test(clientId)) {
        newErrors.clientId = "Invalid Staff ID format";
        isValid = false;
      }
    }
    if (type.trim() === "") {
      newErrors.type = "Type is required";
      isValid = false;
    }
    if (type !== "visitor") {
      if (department.trim() === "") {
        newErrors.department = "Department is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("client_id", clientId);
      formData.append("name", name);
      formData.append("dept", department);
      formData.append("user_type", type);
      if (type.toLowerCase() === "visitor") {
        formData.append("invited_by", invitedBy);
      }
      if (capturedImage) {
        const blob = await fetch(capturedImage).then((r) => r.blob());
        formData.append("file", blob, "image.jpg");
      }
      
      try {
        // let res = await addAUser(formData);
        console.log(res)
        // onClose();
      } catch (error) {
        throw new Error("failed to add user", error);
      }
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    if (isCameraActive) {
      setCapturedImage(null);
    }
  };

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc || null);
    setIsCameraActive(false);
  }, [webcamRef]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-md p-6 m-4 bg-white rounded-lg dark:bg-gray-800">
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
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Client ID"
              error={errors.clientId}
            />
          </div>
          <div className="flex gap-8 mb-4">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
              <option value="ME">Mechanical</option>
              <option value="CE">Civil</option>
              <option value="IT">Information Technology</option>
              {/* Add more options as needed */}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="visitor">Visitor</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {type.toLowerCase() === "visitor" && (
            <div className="mb-4">
              <Input
                type="text"
                value={invitedBy}
                onChange={(e) => setInvitedBy(e.target.value)}
                placeholder="Invited By"
              />
            </div>
          )}
          <div className="mb-4">
            {isCameraActive ? (
              <div className="relative">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full rounded-lg"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleCamera}
                    className="px-4 py-2 mt-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    onClick={captureImage}
                    className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Capture Image
                  </button>
                </div>
              </div>
            ) : capturedImage ? (
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="object-cover w-full h-48 rounded-lg"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCapturedImage(null)}
                    className="px-4 py-2 mt-2 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Remove Image
                  </button>
                  <button
                    type="button"
                    onClick={toggleCamera}
                    className="px-4 py-2 mt-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  >
                    Retake Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={toggleCamera}
                  className="px-4 py-2 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Take Photo
                </button>
                <button
                  type="button"
                  onClick={triggerImageUpload}
                  className="px-4 py-2 text-white bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Upload Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
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
