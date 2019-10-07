import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDraw from '../Navigation/SideDraw/SideDraw'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosed = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerOpen = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }


    render () {
        return (
            <Aux>
                    <Toolbar
                    isAuth={this.props.isAuthenticated}
                     showSide ={this.sideDrawerOpen}/>
                    <SideDraw 
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerClosed} 
                    open={this.state.showSideDrawer}/>
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
