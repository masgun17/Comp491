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

export const createPartService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.createPart, data).then(resolve).catch(reject);
  });

export const getAllPartsService = async () =>
  new Promise((resolve, reject) => {
    axios.get(API.getAllParts).then(resolve).catch(reject);
  });

  export const createQuestionService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.createQuestion, data).then(resolve).catch(reject);
  });

export const getAllQuestionsService = async () =>
  new Promise((resolve, reject) => {
    axios.get(API.getAllQuestions).then(resolve).catch(reject);
  });
