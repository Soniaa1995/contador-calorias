import { Activity } from "../types";

//useReducer maneja el state

export type ActivityActions = 
  {type: "save-activity", payload: { newActivity: Activity } } | 
  {type: "set-activeId", payload: { id: Activity['id'] }} 
  
  //payload son los datos que le pasas junto a la accion que lo recupera
  //con | registramos un pipe
  //definir acciones en el reducer

export type ActivityState = {
  activities: Activity[], 
  activeId: Activity['id']
};

export const initialState: ActivityState = {
  activities: [],
  activeId: ''
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
    
  if (action.type === "save-activity") {
    //Este codigo maneja la logica para actualizar el state

    let updateActivities : Activity[] = []

    if(state.activeId){ //tenemos que iterar sobre las actividades para saber cual hay que actualizar el payload
      updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity: activity)
    } else{
      updateActivities = [...state.activities, action.payload.newActivity]
    }

    return {
        ...state,
        activities: updateActivities,
        activeId: ''
    }
  }

  if (action.type === 'set-activeId') {
    return {
      ...state, 
      activeId: action.payload.id
    }
  }

  return state;
};
