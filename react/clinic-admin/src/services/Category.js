import {http} from "../http-common";

const getAllCategory = () => {
    return http.get("topic/category");
};

const postCategory = (state) => {
    return http.post("topic/category/" , state);
}

const deleteCategory = (id) => {
    return http.delete(`topic/category/${id}`);
}

const updateCat = (id , state) => {
    return http.put(`topic/category/${id}/` , state);
}

const Category = {
    getAllCategory,
    postCategory,
    deleteCategory,
    updateCat
}

export default Category;