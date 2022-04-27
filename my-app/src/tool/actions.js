import * as services from "./services";

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
