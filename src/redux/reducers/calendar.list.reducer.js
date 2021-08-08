const calendarListReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_CALENDAR_LIST':
            return action.payload
        default:
            return state;
    }
}

export default calendarListReducer