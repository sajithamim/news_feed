import http from "../http-common";

const getAllCategory = () => {
    return http.get("topic/category");
};

const postCategory = (state) => {
    return http.post("topic/category/" , state);
}

const deleteCategory = (id) => {
    console.log("id" , id);
    return http.delete(`topic/category/${id}`);
}

const Category = {
    getAllCategory,
    postCategory,
    deleteCategory
}

export default Category;