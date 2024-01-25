import {ADD_EXPERIENCE, ADD_MASSAGE_TYPE, ADD_INTENSITY, ADD_LOOKING_FOR, ADD_WHERESYOUR_PAIN} from './actions'
// 
export const reducer = (state, action) => {
    switch (action.type){
        case ADD_EXPERIENCE : {
            return {...state, experience: action.payload}
        }
        case (ADD_MASSAGE_TYPE): {
            return {...state, massageType: action.payload}
        }
        case ADD_INTENSITY : {
            return {...state, intensity: action.payload}
        }
        case (ADD_LOOKING_FOR): {
            return {...state, lookingFor: action.payload}
        }
        case (ADD_WHERESYOUR_PAIN): {
            return {...state, wheresYourPain: action.payload}
        }
    }
}