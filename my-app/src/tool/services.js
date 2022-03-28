import API from "./api";
import axios from "axios";

export const addNumService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.add, data).then(resolve).catch(reject);
  });

export const fetchDBService = async () =>
  new Promise((resolve, reject) => {
    axios.get(API.fetchDB).then(resolve).catch(reject);
  });
