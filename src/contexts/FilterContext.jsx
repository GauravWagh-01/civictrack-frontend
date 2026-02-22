import { createContext, useContext } from 'react';
import { useProjectFilter } from '../hooks/useProjectFilter.js';

const FilterContext = createContext(undefined);

export function FilterProvider({ children }) {
    const filterState = useProjectFilter();

    return (
        <FilterContext.Provider value={filterState}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within FilterProvider');
    }
    return context;
}
