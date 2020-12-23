import {SWITCH_THEME} from '../actions/ThemeActions';

const CurrentTheme ={
    theme: 'light',
};

const ThemeReducer = (state = CurrentTheme, action) => {
    switch(action.type){
        case SWITCH_THEME:
            return { theme:action.theme };
            
        default:
            return state;
    }
}

export default ThemeReducer;