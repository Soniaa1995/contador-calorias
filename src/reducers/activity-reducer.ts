
import { Activity } from "../types";

//useReducer maneja el state

export type ActivityActions = 
  {type: "save-activity", payload: { newActivity: Activity } } | 
  {type: "set-activeId", payload: { id: Activity['id'] }} |
  {type: "delete-activity", payload: { id: Activity['id'] }} |
  {type: "restart-app"}
  
  //payload son los datos que le pasas junto a la accion que lo recupera
  //con | registramos un pipe

export type ActivityState = {
  activities: Activity[], 
  activeId: Activity['id']
};

const localStorageActivities = () : Activity[] => {
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: ''
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
    
  if (action.type === "save-activity") {
    //Este codigo maneja la logica para actualizar el state

    let updateActivities : Activity[] = []

    if(state.activeId){ //tenemos que iterar sobre las actividades para saber cual hay que actualizar el payload //EDITAR
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

  if(action.type === 'delete-activity'){ //BORRAR ACTIVIDADES
    return{
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id )
    }
  }

  if(action.type === 'restart-app'){
    return{
      activities: [],
      activeId: ''
    }
  }

  return state;
};
