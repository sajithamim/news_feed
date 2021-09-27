import { http } from "../http-common";


const getAllQuiz = () => {
    return http.get("spec/quiz/");
  };

const postQuiz = (state) => {
    return http.post("spec/quiz/", state);
  
}
const quiz = {
    postQuiz,
    getAllQuiz
};

export default quiz;