import * as actionTypes from './action';

const initialState = {
    restaurantList:{},
    currentSearchResult:null,
    currentSearchFilter:{
        city:"",
        name:"",
        address:"",
        area:"",
        page:null,
        per_page:null
    },
};

const reducer = (store = initialState, action) => {

    switch (action.type) {
        case actionTypes.UPDATE_RESTAURANT_LIST:
            return{
                ...store,
                restaurantList: {
                    ...store.restaurantList,
                    [action.city]:{
                        ...action.restaurantList,
                        ...store.restaurantList[action.city],

                    }
                }
            };
        case actionTypes.UPDATE_CURRENT_SEARCH_RESULT:
            return{
                ...store,
                currentSearchResult: action.currentSearchResult
            };
        case actionTypes.UPDATE_CURRENT_SEARCH_FILTER:
            return{
                ...store,
                currentSearchFilter:action.currentSearchFilter
            }
        default:
            return store;
    }
};

export default reducer;