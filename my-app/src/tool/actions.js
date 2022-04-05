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
