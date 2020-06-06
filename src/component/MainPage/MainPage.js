import React, { Component } from 'react';
import "./MainPage.css";
import connect from "react-redux/es/connect/connect";
import * as actionTypes from '../../store/action';

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            input:""
        }
    }

    searchInputChange(event){
        this.setState({
            input:event.target.value
        })
    }

    searchSubmit(){
        this.props.queryByCity(this.state.input,this.props.history);
    }

    render(){
        return(
            <div className={"search-wrapper"}>
                <div className={"header"}>
                    <h1>Welcome to Open Table Search</h1>
                    <h3>Enter a city name to locate your restaurant!</h3>
                </div>
                <div className={"search-bar"}>
                    <input type={"text"} placeholder={"Enter a city... (eg. Toronto)"} alt={"Enter a city..."} value={this.state.input} onChange={this.searchInputChange.bind(this)}/>
                    <button onClick={this.searchSubmit.bind(this)}>Search</button>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
    };
};
const mapDispatchToProps = dispatch => {
    return{
        queryByCity: (city, history) => dispatch({type:actionTypes.SAGA_QUERY_BY_CITY, city:city, history:history}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
