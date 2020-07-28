import React, {
  useReducer,
  createContext,
} from 'react';

import { AuthReducer, ContextProps } from './types';
import { initialState, reducer } from './reducer';

export * from './reducer';
export * from './types';
export const GlobalContext = createContext<ContextProps>([
  initialState,
  () => null
]);
export const StoreConsumer = GlobalContext.Consumer;

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<AuthReducer>(reducer, initialState);
  const value = React.useMemo<ContextProps>(
    () => [state, dispatch],
    [state, dispatch]
  )

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useStore() {
  return React.useContext(GlobalContext)
}