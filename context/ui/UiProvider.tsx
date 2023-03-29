/**
 * 2 se crea el provider
 */
import { FC, useReducer, PropsWithChildren } from 'react';
import { UiContext, uiReducer } from './';


export interface UiState{
   isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState ={
    isMenuOpen: false,
}

export const UiProvider:FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

   const toggleSideMenu = () => {
        dispatch({ type:'[UI] - ToggleMenu' })
   }

   return(
       <UiContext.Provider value={{
           ...state,

           //Metodos
           toggleSideMenu, //recuerda que lo debes de registrar en el  contexto
       }}>
           { children }
       </UiContext.Provider>

   )
}