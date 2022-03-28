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
