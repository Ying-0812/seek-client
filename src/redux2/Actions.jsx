import { Add, Delete, ChangeStatus } from "./ActionsType";

export const addAction = (content) => ({
    type: Add,
    payload: content
})

export const deleteAction = (index) => ({
    type: Delete,
    payload: index
})

export const changeAction = (index) => ({
    type: ChangeStatus,
    payload: index
})