import { Add, Delete, ChangeStatus } from "./ActionsType";

const defaultState = {
    list: [{
        content: 'React',
        status: false
    },{
        content: 'Vue',
        status: false
    },{
        content: 'TypeScript',
        status: false
    },{
        content: 'Angular',
        status: false
    }]
}

export const Reducer = function (state = defaultState, action) {
    switch (action.type) {
        case Add: 
            const newArr = [...state.list.list]
            newArr.push({
                content: action.payload,
                status: false
            })
            return {list: {list: newArr}}
        case Delete: 
            const deleArr = [...state.list.list]
            deleArr.splice(action.payload, 1)
            return {list: {list: deleArr}}
        case ChangeStatus: 
            const changeArr = [...state.list.list]
            changeArr[action.payload].status = !changeArr[action.payload].status
            return {list: {list: changeArr}}
        default: 
            return {list: state}
    }
}

