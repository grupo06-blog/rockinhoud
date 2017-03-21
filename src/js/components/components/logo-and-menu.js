import React, {Component} from 'react';
import {goToHome, goToQuemSomos, goToAllPost, goToAllEbooks} from '../../helpers/go-to';

class LogoAndMenu extends Component {

    render() {
        return (
            <div id="logoAndMenuContainer">
                <a onClick={goToHome.bind(this)}>
                    <img src="images/logo-white.png" height='30px'/>
                </a>
                <div id="menu" className="hide-on-med-and-down">
                    <div className="menu-item">
                        <a onClick={goToHome.bind(this)}>
                            Página Inicial
                        </a>
                    </div>
                    <div className="menu-item">
                        <a href="https://rockinhoud.wordpress.com/" target="_blank">
                            {/*<a onClick={goToAllPost.bind(this)}>*/}
                            Blog
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

LogoAndMenu.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default LogoAndMenu;