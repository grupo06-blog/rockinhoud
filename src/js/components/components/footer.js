import React, {Component} from 'react';

class Footer extends Component {

    render() {
        return (
            <div id="c-footer">
                <div id="gradient-footer">
                    <div className="row">
                        Todos os direitos reservados
                    </div>
                    <a href="https://www.facebook.com/rockinhoud" target="_blank"> <img className="facebook" src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-256.png"/></a>
                    <div className="row">
                        @2017 - Rock Inhoud
                    </div>
                </div>
            </div>
        );
    }
}
export default Footer;