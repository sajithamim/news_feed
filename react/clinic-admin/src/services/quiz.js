import { http } from "../http-common";


const getAllQuiz = (page) => {
    return http.get(`spec/quiz?page=${page}`);
};

const postQuiz = (state) => {
    return http.post("spec/quiz/", state);

}
const deleteQuiz = (id) => {
    return http.delete(`spec/quiz/${id}`);
}

const updateQui = (id, state) => {
    console.log("show now", state, id);
    return http.put(`spec/quiz/${id}/`, state);
}
const getSpecialization = () => {
    return http.get("spec/getspec/")
}
const getAllSubSpec = (id) => {
    console.log("getSubSpecialisation");
    return http.get(`spec/specialization/${id}/spubspec_list`);
}
const quiz = {
    postQuiz,
    getAllQuiz,
    deleteQuiz,
    updateQui,
    getSpecialization,
    getAllSubSpec
};

export default quiz;