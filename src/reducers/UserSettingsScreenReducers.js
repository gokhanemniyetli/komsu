import { 
    SIGNOUT_USER_SUCCESS, 
    SIGNOUT_USER_FAIL, 
    SIGNOUT_USER 
} from '../actions/Types';

const INITIAL_STATE = {
 res: '',
 loadingSingOut:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNOUT_USER:
            return { ...state, loadingSingOut:true };
        case SIGNOUT_USER_SUCCESS:
            return { ...state, loadingSingOut:false };
        case SIGNOUT_USER_FAIL:
            return { ...state, loadingSingOut:false };
        default:
            return state;
    }
};

