import React, { Component } from 'react';
import "./RestaurantList.css";
import connect from "react-redux/es/connect/connect";
import * as actionTypes from "../../../store/action";

class RestaurantList extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(!this.props.currentSearchResult){
            this.props.history.push("/");
        }
    }

    searchPrevPageSubmit(){
        let prevSearch = this.props.currentSearchFilter;
        this.props.queryByCity(prevSearch.city,prevSearch.name,prevSearch.address,prevSearch.area, this.props.currentSearchResult.current_page-1, this.props.history);
    }

    searchNextPageSubmit(){
        let prevSearch = this.props.currentSearchFilter;
        console.log(this.props.currentSearchResult);
        this.props.queryByCity(prevSearch.city,prevSearch.name,prevSearch.address,prevSearch.area, this.props.currentSearchResult.current_page+1, this.props.history);
    }

    render(){
        if(this.props.currentSearchResult){
            const first = (this.props.currentSearchResult.current_page-1)*10+1;
            const last = (first+9)<this.props.currentSearchResult.total_entries?(first+9):this.props.currentSearchResult.total_entries;
            return(
                <div className={"restaurant-list-wrapper"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.currentSearchResult.restaurants.map((restaurant)=>{
                            return(
                                <tr>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.address}</td>
                                    <td>{restaurant.price}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <div className={"footer"}>
                        <div className={"footer-text"}>
                            <small>{"Showing "+first+" to "+last+" out of "+this.props.currentSearchResult.total_entries + " records"}</small>
                            <small>{"Page "+this.props.currentSearchResult.current_page}</small>
                        </div>
                        <div className={"footer-button"}>
                            {this.props.currentSearchResult.current_page>1?<button className={"prev"} onClick={this.searchPrevPageSubmit.bind(this)}>Previous Page</button>:null}
                            <button className={"next"} onClick={this.searchNextPageSubmit.bind(this)}>Next Page</button>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return <div/>
        }
    }
}
const mapStateToProps = state => {
    return{
        currentSearchResult: state.currentSearchResult,
        currentSearchFilter: state.currentSearchFilter
    };
};
const mapDispatchToProps = dispatch => {
    return{
        queryByCity: (city, name, address, area, page, history) => dispatch({type:actionTypes.SAGA_QUERY_BY_CITY, city:city, name:name, address:address, area:area, page:page, history:history}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
