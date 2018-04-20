export default function ({ dispatch }){
    return next => action => {
            /* Iif action doesn't have payloaod or, 
            the payload doesn't hava a .then property
            we dont't care about it, send it on*/
            if (!action.payload || !action.payload.then){
                return next(action)

            }
        //make sure action's promise resolves
        action.payload
            .then(function(response){
                /* create a new action with old type, but
                replace the promise with a new response data*/
                const newAction = {...action, payload: response }
                /*take the action and send it to very top reducer again */
                dispatch(newAction)
            })
    }

}