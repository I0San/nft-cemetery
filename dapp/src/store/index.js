import { create } from 'zustand'

export const useGraveyardStore = create((set) => ({
    totalGraves: 0,
    page: 1,
    pageSize: 9,
    graves: [],
    setGraves: (graves) => set({ graves }),
    setTotalGraves: (totalGraves) => set({ totalGraves }),
    setPage: (page) => set({ page }),
}))