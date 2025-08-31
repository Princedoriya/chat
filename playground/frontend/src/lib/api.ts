import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://playground-11.onrender.com";

export const getProfile = async (email: string) =>
  axios.get(`${API_BASE}/profile`, { params: { email } }).then(r => r.data);

export const getProjects = async (skill?: string) =>
  axios.get(`${API_BASE}/projects`, { params: skill ? { skill } : {} }).then(r => r.data);

export const getTopSkills = async () =>
  axios.get(`${API_BASE}/projects/skills/top`).then(r => r.data);

export const search = async (q: string) =>
  axios.get(`${API_BASE}/projects/search`, { params: { q } }).then(r => r.data);

export const health = async () =>
  axios.get(`${API_BASE}/health`).then(r => r.data);
