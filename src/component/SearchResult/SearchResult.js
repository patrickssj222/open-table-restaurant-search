import React, { Component } from 'react';
import "./SearchResult.css";
import connect from "react-redux/es/connect/connect";
import * as actionTypes from '../../store/action';
import RestaurantList from "./RestaurantList/RestaurantList";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class SearchResult extends Component{
    constructor(props) {
        super(props);
        this.state={
            city:this.props.currentSearchFilter.city,
            name:this.props.currentSearchFilter.name,
            address:this.props.currentSearchFilter.address,
            area:this.props.currentSearchFilter.area,
        }
    }

    componentDidMount() {
        if(!this.props.currentSearchResult){
            this.props.history.push("/");
        }
    }

    searchInputChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    searchSubmit(){
        this.props.queryByCity(this.state.city,this.state.name,this.state.address,this.state.area,this.props.history);
    }

    render(){
        return(
            <div className={"search-result-wrapper"}>
                <div className={"header"}>
                    <h2>Refine your search result</h2>
                    <div className={"search-item-group"}>
                        <div className={"search-item"}>
                            <label>City</label>
                            <input type={"text"} name={"city"} value={this.state.city} onChange={this.searchInputChange.bind(this)}/>
                        </div>
                        <div className={"search-item"}>
                            <label>Name</label>
                            <input type={"text"} name={"name"} value={this.state.name} onChange={this.searchInputChange.bind(this)}/>
                        </div>
                        <div className={"search-item"}>
                            <label>Address</label>
                            <input type={"text"} name={"address"} value={this.state.address} onChange={this.searchInputChange.bind(this)}/>
                        </div>
                        <div className={"search-item"}>
                            <label>Area</label>
                            <input type={"text"} name={"area"} value={this.state.area} onChange={this.searchInputChange.bind(this)}/>
                        </div>
                    </div>
                    <button onClick={this.searchSubmit.bind(this)}>Search</button>
                </div>
                <div className={"body"}>
                    <Router>
                        <Switch>
                            <Route path={"/"} component={RestaurantList}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
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
        queryByCity: (city, name, address, area, history) => dispatch({type:actionTypes.SAGA_QUERY_BY_CITY, city:city, name: name, address: address, area: area, history:history}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
