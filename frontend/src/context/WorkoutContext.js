import { createContext, useReducer, useContext } from "react";

const WorkoutsContext = createContext();

const workoutsReducer = (state, action) => {
    switch (action.type) {
        case "SET_WORKOUTS":
            return {
                ...state,
                workouts: action.payload,
            };
        case "CREATE_WORKOUT":
            return {
                ...state,
                workouts: [action.payload, ...state.workouts],
            };
        default:
            return state;
    }
};

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [],
    });

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);

    if (!context) {
        throw Error(
            "useWorkoutsContext must be used inside a WorkoutsContextProvider"
        );
    }

    return context;
};
