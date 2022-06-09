import API from "./api";
import axios from "axios";

// These services use addresses defined in api.js. They use axios.post or axios.get methods
// and return 'Promise's. Those 'Promise's are handled in actions.js

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

export const signUpService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.creatingNewAccount, data).then(resolve).catch(reject);
  });

export const loginService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.loginAccount, data).then(resolve).catch(reject);
  });

export const createNewAdminService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.createNewAdminAccount, data).then(resolve).catch(reject);
  });

export const createNewSuperAdminService = async (data) =>
  new Promise((resolve, reject) => {
    axios
      .post(API.createNewSuperAdminAccount, data)
      .then(resolve)
      .catch(reject);
  });

export const changePasswordService = async (data) =>
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

export const createAssessmentSessionService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.createAssessmentSession, data).then(resolve).catch(reject);
  });

export const uploadUserAnswersService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.uploadUserAnswers, data).then(resolve).catch(reject);
  });
  export const saveImageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.saveImage, data).then(resolve).catch(reject);
  });

  export const getImagesService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getImages).then(resolve).catch(reject);
  });

  export const updateImageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.updateImageFromIndex, data).then(resolve).catch(reject);
  });
  export const evaluateService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.evaluate, data).then(resolve).catch(reject);
  });


  export const deleteImageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.deleteImageFromIndex, data).then(resolve).catch(reject);
  });

  export const removeAllImagesService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.removeAllImages).then(resolve).catch(reject);
  });

  export const saveImageInfoPageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.saveImageInfoPage, data).then(resolve).catch(reject);
  });

  export const getImagesInfoPageService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getImagesInfoPage).then(resolve).catch(reject);
  });

  export const updateImageInfoPageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.updateImageFromIndexInfoPage, data).then(resolve).catch(reject);
  });

  export const deleteImageInfoPageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.deleteImageFromIndexInfoPage, data).then(resolve).catch(reject);
  });

  export const removeAllImagesInfoPageService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.removeAllImagesInfoPage).then(resolve).catch(reject);
  });

  export const saveImageRiskPageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.saveImageRiskPage, data).then(resolve).catch(reject);
  });

  export const getImagesRiskPageService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getImagesRiskPage).then(resolve).catch(reject);
  });

  export const updateImageRiskPageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.updateImageFromIndexRiskPage, data).then(resolve).catch(reject);
  });

  export const deleteImageRiskPageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.deleteImageFromIndexRiskPage, data).then(resolve).catch(reject);
  });

  export const removeAllImagesRiskPageService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.removeAllImagesRiskPage).then(resolve).catch(reject);
  });

  
  export const saveVideoService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.saveVideo,data).then(resolve).catch(reject);
  });

  export const getVideosService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.getVideos,data).then(resolve).catch(reject);
  });

  export const getAssessmentsService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.getAssessments,data).then(resolve).catch(reject);
  });
  
  export const getAllAssessmentsService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getAllAssessments).then(resolve).catch(reject);
  });
  
  export const getAllAnswersService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.getAllAnswers,data).then(resolve).catch(reject);
  });

  export const saveDataAsExcelService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.saveDataAsExcel).then(resolve).catch(reject);
  });
  

  export const getSuggestionsByAssessmentIdService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.getSuggestionsByAssessmentId,data).then(resolve).catch(reject);
  });

  export const getSuggestionsContentService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.getSuggestionsContent,data).then(resolve).catch(reject);
  });

  export const getAnswerPercentageService = async (data) =>
  new Promise((resolve, reject) => {
    axios.post(API.getAnswerPercentage,data).then(resolve).catch(reject);
  });
  
  export const getTotalPeopleCountService = async () =>
  new Promise((resolve, reject) => {
    axios.post(API.getTotalPeopleCount).then(resolve).catch(reject);
  });
  
  