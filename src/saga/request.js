import * as actionTypes from '../store/action';
import {takeEvery, put,call,delay,select} from 'redux-saga/effects';
import axios from 'axios';

function* queryByCity(action){
    console.log(action.page);
    try{
        const response = yield call (axios, {
            method: 'GET',
            url: 'http://opentable.herokuapp.com/api/restaurants?city='+action.city+
                (action.name&&action.name!==""?("&name="+action.name):"")+
                (action.address&&action.address!==""?("&name="+action.address):"")+
                (action.area&&action.area!==""?("&name="+action.area):"")+
                (action.page?("&page="+action.page):"")+
                (action.per_page?("&per_page="+action.per_page):"&per_page=10")
        });
        console.log(response);
        if(response.status>=200 && response.status<300){
            yield put({type:actionTypes.UPDATE_CURRENT_SEARCH_RESULT, currentSearchResult:response.data});
            const currentSearchFilter={
                city:action.city,
                name:action.name?action.name:"",
                address:action.address?action.address:"",
                area:action.area?action.area:"",
                page:action.page,
                per_page:action.per_page
            }
            yield put({type:actionTypes.UPDATE_CURRENT_SEARCH_FILTER, currentSearchFilter:currentSearchFilter});
            let restaurantList = {};
            response.data.restaurants.forEach((restaurant)=>{
                restaurantList[restaurant.id]={
                    name:restaurant.name,
                    address:restaurant.address,
                    area:restaurant.area
                }
            });
            yield put({type:actionTypes.UPDATE_RESTAURANT_LIST,city:action.city,restaurantList:restaurantList});
            yield action.history.push({pathname:"/search-result"});
        }
        else{
            console.log("Error " + response.data.status);
        }
    }
    catch(e){
        console.log(e);
    }
}

export function* watchSagaRequests() {
    yield takeEvery(actionTypes.SAGA_QUERY_BY_CITY, queryByCity);
}