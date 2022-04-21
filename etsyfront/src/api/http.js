import axios from 'axios';

// export const BASE = "http://34.238.124.46:8080";
// const BASE_URL = "http://34.238.124.46:8080/api/";
export const BASE = 'http://localhost:8080';
const BASE_URL = 'http://localhost:8080/api/';
const TOKEN = localStorage.getItem('token');

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
