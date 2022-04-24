import axios from 'axios';

// const BASE_URL = "http://34.238.124.46:8080/api/";
const BASE_URL = 'http://localhost:8080/api/';
const TOKEN = localStorage.getItem('token');

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
