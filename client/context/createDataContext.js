import React, { createContext, useMemo, useReducer } from 'react';

export default function createDataContext(contextName, actions, initialState){

    /**
     * a super generic 'reduce' function, that can be used with an 'actions' object
     */
    function reduce(currState, { type, payload }){
        return (type in actions) ? actions[type](currState, payload) : currState;
    }

    // simple react context
    const Context = createContext();

    /**
     * this will be a react component, that will wrap the app
     */
    const Provider = ({ children }) => {

        // initialState is given to useReducer
        const [state, dispatch] = useReducer(reduce, initialState);

        // methods will be provided to app components,
        // only a call to the method with a payload is needed to dispatch an action.
        // actionToMethods will be responsible for that
        const methods = useMemo(() => actionsToMethods(actions, dispatch), [contextName]);

        const ctx = {
            state,
            methods
        };

        // wrap children and provide data and dispatch methods
        return (
            <Context.Provider value={ctx}>
                {children}
            </Context.Provider>
        );
    }

    return {
        Provider,
        Context,
    }
};

// create an object, where each key corresponds to one action,
// and holds a function that just calls 'dispatch' with the correct arguments
function actionsToMethods(actions, dispatch){
    const methods = Object.keys(actions).reduce((allMethods, type) => {

        allMethods[type] = (payload) => dispatch({
            type,
            payload
        });

        return allMethods;
    }, {});

    return methods;
}