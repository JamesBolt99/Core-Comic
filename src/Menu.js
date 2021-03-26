import { Component } from 'react'

import './Menu.css'
import Search from './Images/loupe.png'
import Logo from './Images/home.png'
import Basket from './Images/shopping-cart.png'

class TopBar extends Component {
    render() {
        return (
            <section className="TopBar">
                <a href="./Search"><img className="SearchImage" src={Search} alt='Search'/></a>;
                <a href="./ComicList"><img className="Logo" src={Logo} alt='Comic List' /></a>
                <a href="./Basket"><img className="Basket" src={Basket} alt='Basket'/></a>
            </section>
        );
    }

}

export default TopBar;