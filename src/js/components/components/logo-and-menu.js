import React, {Component} from 'react';
import {goToHome, goToQuemSomos, goToAllPost, goToAllEbooks} from '../../helpers/go-to';

class LogoAndMenu extends Component {

    render() {
        return (
            <div id="logoAndMenuContainer">
                <a onClick={goToHome.bind(this)}>
                    <img src="images/logo.png"  height='50px' alt="VoaAi Logo"/>
                </a>
                <div id="menu" className="hide-on-med-and-down">
                    <div className="menu-item">
                        <a onClick={goToHome.bind(this)}>
                            Página Inicial
                        </a>
                    </div>
                    <div className="menu-item">
                        <a onClick={goToAllPost.bind(this)}>
                            Todas as Postagens
                        </a>
                    </div>
                    <div className="menu-item">
                        <a onClick={goToAllEbooks.bind(this)}>
                            E-books
                        </a>
                    </div>
                    <div className="menu-item">
                        <a onClick={goToQuemSomos.bind(this)}>
                            Quem Somos
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