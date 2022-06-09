import * as services from "./services";

// These actions are functions that will be used in our React project. They wait responses from
// 'Promise's that are passed from services.js and return their results.

export const addNumAction = async (data) => {
  try {
    const result = await services.addNumService(data);
    return result.data;
  } catch (error) {
    console.log("Error on addNumAction");
    console.log(error);
  }
};

export const fetchDBAction = async () => {
  try {
    const result = await services.fetchDBService();
    return result.data;
  } catch (error) {
    console.log("Error on fetchDBAction");
    console.log(error);
  }
};

export const createPartAction = async (data) => {
  try {
    const result = await services.createPartService(data);
    return result.data;
  } catch (error) {
    console.log("Error on createPartAction");
    console.log(error);
  }
}

export const getAllPartsAction = async () => {
  try {
    const result = await services.getAllPartsService();
    return result.data;
  } catch (error) {
    console.log("Error on getAllPartsAction");
    console.log(error);
  }
}

export const createQuestionAction = async (data) => {
  try {
    const result = await services.createQuestionService(data);
    return result.data;
  } catch (error) {
    console.log("Error on createQuestionAction");
    console.log(error);
  }
}

export const getAllQuestionsAction = async () => {
  try {
    const result = await services.getAllQuestionsService();
    return result.data;
  } catch (error) {
    console.log("Error on getAllQuestionsAction");
    console.log(error);
  }
}

export const signUpAction = async (data) => {
  try{
    const result = await services.signUpService(data);
    return result.data;
  }catch (error){
    console.log("Error on signUpAction");
    console.log(error);
  }
};

export const loginAction = async (data) => {
  try{
    const result = await services.loginService(data);
    return result.data;
  }catch (error){
    console.log("Error on loginAction");
    console.log(error);
  }
};

export const createNewAdminAction = async (data) => {
  try{
    const result = await services.createNewAdminService(data);
    return result.data;
  }catch (error){
    console.log("Error on createNewAdminAction");
    console.log(error);
  }
};

export const createNewSuperAdminAction = async (data) => {
  try{
    const result = await services.createNewSuperAdminService(data);
    return result.data;
  }catch (error){
    console.log("Error on createNewSuperAdminAction");
    console.log(error);
  }
};


export const changePasswordAction = async (data) => {
  try{
    const result = await services.changePasswordService(data);
    return result.data;
  }catch (error){
    console.log("Error on changePasswordAction");
    console.log(error);
  }
};
export const deletePartAction = async (data) => {
  try {
    const result = await services.deletePartService(data);
    return result.data;
  } catch (error) {
    console.log("Error on deletePartAction");
    console.log(error);
  }
}

export const deleteQuestionAction = async (data) => {
  try {
    const result = await services.deleteQuestionService(data);
    return result.data;
  } catch (error) {
    console.log("Error on deleteQuestionAction");
    console.log(error);
  }
}

export const submitNewPasswordAction = async (data) => {
  try {
    console.log(data)
    const result = await services.submitNewPasswordService(data);
    return result.data;
  } catch (error) {
    console.log("Error on submitNewPasswordAction");
  }
}

export const createAssessmentSessionAction = async (data) => {
  try {
    const result = await services.createAssessmentSessionService(data);
    return result.data
  } catch (error) {
    console.log("Error on createAssessmentSessionAction");
    console.log(error);
  }
}

export const uploadUserAnswersAction = async (data) => {
  try {
    const result = await services.uploadUserAnswersService(data);
    return result.data
  } catch (error) {
    console.log("Error on uploadUserAnswersAction");
  }
}

export const saveImageAction = async (data) => {
  try {
    const result = await services.saveImageService(data);
    return result.data
  } catch (error) {
    console.log("Error on saveImageAction");
    console.log(error);
  }
}

export const getImagesAction = async () => {
  try {
    const result = await services.getImagesService();
    return result.data
  } catch (error) {
    console.log("Error on getImagesAction");
    console.log(error);
  }
}

export const updateImageAction = async (data) => {
  try {
    const result = await services.updateImageService(data);
    return result.data
  } catch (error) {
    console.log("Error on updateImageAction");
    console.log(error);
  }
}

export const deleteImageAction = async (data) => {
  try {
    const result = await services.deleteImageService(data);
    return result.data
  } catch (error) {
    console.log("Error on deleteImageAction");
    console.log(error);
  }
}

export const removeAllImagesAction = async () => {
  try {
    const result = await services.removeAllImagesService();
    return result.data
  } catch (error) {
    console.log("Error on removeAllImagesAction");
    console.log(error);
  }
}

export const saveImageInfoPageAction = async (data) => {
  try {
    const result = await services.saveImageInfoPageService(data);
    return result.data
  } catch (error) {
    console.log("Error on saveImageInfoPageAction");
    console.log(error);
  }
}

export const getImagesInfoPageAction = async () => {
  try {
    const result = await services.getImagesInfoPageService();
    return result.data
  } catch (error) {
    console.log("Error on getImagesInfoPageAction");
    console.log(error);
  }
}

export const updateImageInfoPageAction = async (data) => {
  try {
    const result = await services.updateImageInfoPageService(data);
    return result.data
  } catch (error) {
    console.log("Error on updateImageInfoPageAction");
    console.log(error);
  }
}

export const deleteImageInfoPageAction = async (data) => {
  try {
    const result = await services.deleteImageInfoPageService(data);
    return result.data
  } catch (error) {
    console.log("Error on deleteImageInfoPageAction");
    console.log(error);
  }
}

export const removeAllImagesInfoPageAction = async () => {
  try {
    const result = await services.removeAllImagesInfoPageService();
    return result.data
  } catch (error) {
    console.log("Error on removeAllImagesInfoPageAction");
    console.log(error);
  }
}

export const saveImageRiskPageAction = async (data) => {
  try {
    const result = await services.saveImageRiskPageService(data);
    return result.data
  } catch (error) {
    console.log("Error on saveImageRiskPageAction");
    console.log(error);
  }
}

export const getImagesRiskPageAction = async () => {
  try {
    const result = await services.getImagesRiskPageService();
    return result.data
  } catch (error) {
    console.log("Error on getImagesRiskPageAction");
    console.log(error);
  }
}

export const updateImageRiskPageAction = async (data) => {
  try {
    const result = await services.updateImageRiskPageService(data);
    return result.data
  } catch (error) {
    console.log("Error on updateImageRiskPageAction");
    console.log(error);
  }
}

export const deleteImageRiskPageAction = async (data) => {
  try {
    const result = await services.deleteImageRiskPageService(data);
    return result.data
  } catch (error) {
    console.log("Error on deleteImageRiskPageAction");
    console.log(error);
  }
}

export const removeAllImagesRiskPageAction = async () => {
  try {
    const result = await services.removeAllImagesRiskPageService();
    return result.data
  } catch (error) {
    console.log("Error on removeAllImagesRiskPageAction");
    console.log(error);
  }
}

export const saveVideoAction = async (data) => {
  try {
    const result = await services.saveVideoService(data);
    return result.data
  } catch (error) {
    console.log("Error on saveVideoAction");
    console.log(error);
  }
}


export const getVideosAction = async (data) => {
  try {
    const result = await services.getVideosService(data);
    return result.data
  } catch (error) {
    console.log("Error on getVideosAction");
    console.log(error);
  }
}

export const getAssessmentsAction = async (data) => {
  try {
    const result = await services.getAssessmentsService(data);
    return result.data
  } catch (error) {
    console.log("Error on getAssessmentsAction");
    console.log(error);
  }
}

export const getAllAssessmentsAction = async () => {
  try {
    const result = await services.getAllAssessmentsService();
    return result.data
  } catch (error) {
    console.log("Error on getAllAssessmentsAction");
    console.log(error);
  }
}

export const getAllAnswersAction = async (data) => {
  try {
    const result = await services.getAllAnswersService(data);
    return result.data
  } catch (error) {
    console.log("Error on getAllAnswersAction");
    console.log(error);
  }
}

export const evaluateAction = async (data) => {
  try {
    const result = await services.evaluateService(data);
    return result.data
  } catch (error) {
    console.log("Error on evaluateAction");
    console.log(error);
  }
}

export const saveDataAsExcelAction = async () => {
  try {
    const result = await services.saveDataAsExcelService();
    return result.data
  } catch (error) {
    console.log("Error on saveDataAsExcelAction");
    console.log(error);
  }
}

export const getSuggestionsByAssessmentIdAction = async (data) => {
  try {
    const result = await services.getSuggestionsByAssessmentIdService(data);
    return result.data
  } catch (error) {
    console.log("Error on getSuggestionsByAssessmentIdAction");
    console.log(error);
  }
}

export const getSuggestionsContentAction = async (data) => {
  try {
    const result = await services.getSuggestionsContentService(data);
    return result.data
  } catch (error) {
    console.log("Error on getSuggestionsContentAction");
    console.log(error);
  }
}

export const getAnswerPercentageAction = async (data) => {
  try {
    const result = await services.getAnswerPercentageService(data);
    return result.data
  } catch (error) {
    console.log("Error on getAnswerPercentageAction");
    console.log(error);
  }
}

export const getTotalPeopleCountAction = async () => {
  try {
    const result = await services.getTotalPeopleCountService();
    return result.data
  } catch (error) {
    console.log("Error on getAnswerPercentageAction");
    console.log(error);
  }
}


