import React, { Component } from 'react'
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';
import { checkAuth } from '../redux/authActionCreator';

const makeDispatchToProps = dispatch=>{
    return {
        checkAuth:()=>dispatch(checkAuth())
    }
}

class MainComponent extends Component{
    componentDidMount(){
        this.props.checkAuth()
    }

    render(){
        return (
            <div>
                <Header />
                <BurgerBuilder />
            </div>
        )
    }
    
}

export default connect(null,makeDispatchToProps) (MainComponent);
