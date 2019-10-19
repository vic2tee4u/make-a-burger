import React, { useState } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux';
import Classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDraw from '../Navigation/SideDraw/SideDraw'

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosed = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerOpen = () => {
        setShowSideDrawer(!showSideDrawer)
    }
    
        return (
            <Aux>
                    <Toolbar
                    isAuth={props.isAuthenticated}
                     showSide ={sideDrawerOpen}/>
                    <SideDraw 
                    isAuth={props.isAuthenticated}
                    closed={sideDrawerClosed} 
                    open={showSideDrawer}/>
                <main className={Classes.Content}>
                    {props.children}
                </main>
            </Aux>

        )
    }


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
