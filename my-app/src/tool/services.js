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

  export const signUpService = async(data) =>
  new Promise((resolve, reject) => {
    axios.post(API.creatingNewAccount, data).then(resolve).catch(reject);
  });

  export const loginService = async(data) =>
  new Promise((resolve, reject) => {
    axios.post(API.loginAccount, data).then(resolve).catch(reject);
  });
  
  export const createNewAdminService = async(data) =>
  new Promise((resolve, reject) => {
    axios.post(API.createNewAdminAccount, data).then(resolve).catch(reject);
  });

  export const createNewSuperAdminService = async(data) =>
  new Promise((resolve, reject) => {
    axios.post(API.createNewSuperAdminAccount, data).then(resolve).catch(reject);
  });

  export const changePasswordService = async(data) =>
  new Promise((resolve, reject) => {
    axios.post(API.changePassword, data).then(resolve).catch(reject);
  });
export const deletePartService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.deletePart, data).then(resolve).catch(reject);
  });

export const deleteQuestionService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.deleteQuestion, data).then(resolve).catch(reject);
  });


  export const submitNewPasswordService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.submitNewPassword, data).then(resolve).catch(reject);
  });


  