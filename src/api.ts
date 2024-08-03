import axios, { AxiosResponse } from "axios";
import { User } from "./context/userContext";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const addUser = (formData: FormData): Promise<AxiosResponse> =>
  api.post("/add_face", formData);

export const getUser = (clientId: string): Promise<AxiosResponse> =>
  api.get(`/get_face/${clientId}`);

export const updateUser = (
  clientId: string,
  data: Partial<User>
): Promise<AxiosResponse> => api.put(`/update_face/${clientId}`, data);

export const deleteUser = (clientId: string): Promise<AxiosResponse> =>
  api.delete(`/delete_face`, { data: { client_id: clientId } });
export const getUsers = (): Promise<AxiosResponse> => api.get("/get_users");
