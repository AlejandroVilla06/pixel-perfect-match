import { createContext, useContext, useEffect, useReducer, useRef, type ReactNode } from "react";

export const COMPARE_LIMIT = 3;
const STORAGE_KEY = "stackora:v2";

export interface StoreState {
  favorites: string[];
  compare: string[];
  /** Set when the last compare toggle was rejected because the tray is full. */
  compareFull: boolean;
}

export type StoreAction =
  | { type: "hydrate"; state: Partial<StoreState> }
  | { type: "toggleFavorite"; id: string }
  | { type: "toggleCompare"; id: string }
  | { type: "removeCompare"; id: string }
  | { type: "clearCompare" }
  | { type: "dismissCompareFull" };

export const initialState: StoreState = { favorites: [], compare: [], compareFull: false };

export function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        favorites: action.state.favorites ?? state.favorites,
        compare: (action.state.compare ?? state.compare).slice(0, COMPARE_LIMIT),
      };
    case "toggleFavorite":
      return {
        ...state,
        favorites: state.favorites.includes(action.id)
          ? state.favorites.filter((f) => f !== action.id)
          : [...state.favorites, action.id],
      };
    case "toggleCompare": {
      if (state.compare.includes(action.id)) {
        return { ...state, compare: state.compare.filter((c) => c !== action.id), compareFull: false };
      }
      if (state.compare.length >= COMPARE_LIMIT) return { ...state, compareFull: true };
      return { ...state, compare: [...state.compare, action.id], compareFull: false };
    }
    case "removeCompare":
      return { ...state, compare: state.compare.filter((c) => c !== action.id), compareFull: false };
    case "clearCompare":
      return { ...state, compare: [], compareFull: false };
    case "dismissCompareFull":
      return { ...state, compareFull: false };
  }
}

interface StoreContextValue extends StoreState {
  dispatch: React.Dispatch<StoreAction>;
  isFavorite: (id: string) => boolean;
  isComparing: (id: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const hydrated = useRef(false);

  // Read persisted state after hydration so SSR markup matches the first client render.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ favorites: state.favorites, compare: state.compare }),
    );
  }, [state.favorites, state.compare]);

  const value: StoreContextValue = {
    ...state,
    dispatch,
    isFavorite: (id) => state.favorites.includes(id),
    isComparing: (id) => state.compare.includes(id),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
