
import Specialization from "../services/Specialization";

export const getSpecialisation = () => async (dispatch) => {
    try {
        const res = await Specialization.getAll();
        dispatch({
            type: 'RETRIEVE_SPECIALIZATION',
            payload: res.data,
        });
        } catch (err) {
        console.log(err);
        }
}

export const getSubSpecialisation = (id) => async (dispatch) => {
    try {
        const res = await Specialization.getAllSubSpec(id);
        dispatch({
            type: 'RETREIVE_SUB_SPECIALISATION',
            payload: res.data,
        });
        } catch (err) {
        console.log(err);
        }
}
    

