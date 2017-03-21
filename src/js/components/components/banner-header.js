import React, {Component} from 'react';

import Spinner from '../objects/spinner';

class BannerHeader extends Component {

    render() {
        return (
            <div id="banner">
                <div id="row-container" className="row">
                    <div id="banner-image" className="col s12 m7 hide-on-med-and-down">
                    </div>
                    <div id="info" className="col s12 m6 offset-m3 l5">
                        <h2>FAÇA A VIAGEM DA SUA VIDA ECONOMIZANDO DINHEIRO</h2>
                        Somos um portal de conteúdo que vai te ajudar a aproveitar as suas viagens com os
                        melhores descontos e ofertas!<br/><br/>

                        <input
                            ref="inputName"
                            placeholder="Nome Completo"
                            className="input-field"
                            id="inputName"
                            type="text"
                            value={this.props.userNameValue}
                            onChange={this.props.onInputUserNameChange}/>
                        <input placeholder="Email"
                               className="input-field"
                               type="email"
                               id="inputEmail"
                               value={this.props.emailValue}
                               onChange={this.props.onInputEmailChange}/>
                        <div id="btn-submit">
                            <a id="default-btn" onClick={() => {
                                this.props.onSubmitForm(this)
                            }}>
                                Receber dicas sobre viagens!
                            </a>
                        </div>
                        {this.props.isLoading ? <div className="row ">
                                <p style={{textAlign: 'center'}}><Spinner/></p>
                            </div>
                            : null}
                        {this.props.isError ? <div className="row text-center">
                                {this.props.errorMessage}
                            </div> : null}
                    </div>
                </div>
            </div>
        )
    }
}

BannerHeader.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default BannerHeader;