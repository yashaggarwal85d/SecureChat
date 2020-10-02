import {SWITCH_THEME} from '../actions/ThemeChangeActions';
import { lightTheme,darkTheme,mediumTheme } from '../../constants/colors'

const CurrentTheme ={
    theme: lightTheme,
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