import http from "../http-common";
const getAll = () => {
  return http.get("spec/specialization");
};
const  getAllSubSpec = (id) => {
  console.log("service",id)
  return http.get(`spec/subspecialization/${id}`);
} 

const Specialization = {
  getAll,
  getAllSubSpec
};
  
export default Specialization;