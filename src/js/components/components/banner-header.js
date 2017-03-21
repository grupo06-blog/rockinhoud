import React, {Component} from 'react';

import Spinner from '../objects/spinner';

class BannerHeader extends Component {

    render() {
        return (
            <div id="banner">
                <h1>Alavanque seu negócio agora!</h1>
                <p>Somos especializados em marketing digital e alavancamos seus negócios com os serviços mais
                    rápidos e eficazes! Tudo para você se destacar no mercado!</p>
            </div>
        )
    }
}

BannerHeader.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default BannerHeader;