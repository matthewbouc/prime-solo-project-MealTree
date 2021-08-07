const favoritesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAVORITES_LIST':
        return action.payload;
      default:
        return state;
    }
}

export default favoritesReducer;