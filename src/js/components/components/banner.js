import React, {Component} from 'react';
import Header from '../components/header';
import $ from 'jquery';
import * as firebase from 'firebase';
import moment from 'moment';
import Spinner from '../objects/spinner';

class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            userEmail: "",
            userIp: "",
            isError: false,
            isLoading: false
        }
    }

    componentWillMount() {
        firebase.auth().signInAnonymously();
    }

    isEmptyNullOrUndefined(value) {
        return value && value !== "" && value !== undefined
    }

    shouldSubmitForm(userName, userEmail) {
        if (this.isEmptyNullOrUndefined(userName) &&
            this.isEmptyNullOrUndefined(userEmail) &&
            this.isValidEmail(userEmail) &&
            userName.split(' ').length > 1) {
            return true;
        }

        return false;
    }

    isValidEmail(email) {
        const usuario = email.substring(0, email.indexOf("@"));
        const dominio = email.substring(email.indexOf("@") + 1, email.length);

        return (usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1);
    }

    async submitForm() {
        document.getElementById("inputName").blur();
        document.getElementById("inputEmail").blur();

        let userName = this.state.userName.trim();
        let userEmail = this.state.userEmail.trim();
        let context = this;

        if (this.shouldSubmitForm(userName, userEmail)) {
            context.setState({
                isLoading: true,
            });
            firebase.database().ref('leads/').orderByChild("email").equalTo(userEmail).once("value", function(snapshot) {
                var userData = snapshot.val();
                if (userData){
                    context.setState({
                        isLoading: false,
                        isError: true,
                        errorMessage: 'Email já cadastrado',
                        userName: '',
                        userEmail: '',
                        userIp: ''
                    })
                } else {
                    $.getJSON('https://api.ipify.org?format=json', function (data) {
                        firebase.database().ref('leads/').push({
                            name: userName,
                            email: userEmail,
                            type: 'B2C',
                            ip: data.ip,
                            data: moment().format("MMMM Do YYYY, H:mm:ss")
                        });

                        context.setState({
                            isLoading: false,
                            isError: true,
                            errorMessage: 'Cadastro feito com sucesso!',
                            userName: '',
                            userEmail: '',
                            userIp: ''
                        })
                    });
                }
            });

            window.open('https://goo.gl/G3ytNP');
        } else {
            this.setState({
                isLoading: false,
                isError: true,
                errorMessage: 'Informações incorretas. Por favor, tente novamente.',
                userName: '',
                userEmail: '',
                userIp: ''
            })
        }
    }

    onInputUserNameChange(event) {
        this.setState({
            isError: false,
            userName: event.target.value
        })
    }

    onInputEmailChange(event) {
        this.setState({
            isError: false,
            userEmail: event.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m6">
                    <h1>Saiba como viajar gastando menos!</h1>
                    <p>Baixe o nosso e-book e aproveite as suas férias como nunca!</p>
                </div>
                <div className="col s12 m6">
                    <form className="col s12">
                        <div className="row">
                            <div className="col s12 item-modal">
                                <input
                                    ref="inputName"
                                    placeholder="Nome Completo"
                                    className="input-item"
                                    id="inputName"
                                    type="text"
                                    value={this.state.userName}
                                    onChange={this.onInputUserNameChange.bind(this)}/>
                            </div>
                            <div className="col s12 item-modal">
                                <input placeholder="Email"
                                       className="input-item"
                                       type="email"
                                       id="inputEmail"
                                       value={this.state.userEmail}
                                       onChange={this.onInputEmailChange.bind(this)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <a id="default-btn" onClick={this.submitForm.bind(this)}>Receber eBook gratuito!
                                </a>
                            </div>
                        </div>
                        {this.state.isLoading ? <div className="row">
                                <p style={{textAlign: 'center'}}><Spinner/></p>
                            </div>
                                 : null}
                        {this.state.isError ? <div className="row">
                                <p style={{textAlign: 'center'}}>{this.state.errorMessage}</p>
                            </div> : null}
                    </form>
                </div>
            </div>)
    }
}

class Banner extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shouldDisplayForm: false,
        }
    }

    displayForm() {
        this.setState({
            shouldDisplayForm: true
        })
    }
    render() {
        const { isMainPage } = this.props;
        return (
            <div id="c-banner" className='small-banner'>
                <Header/>
                <div className="container">
                    {isMainPage
                        ? <Content />
                        : !this.state.shouldDisplayForm ?
                            <div className="row">
                                <div className="col s12 l4 offset-l4">
                                    <a id="default-btn" onClick={this.displayForm.bind(this)}>
                                        Receber eBook gratuito!
                                    </a>
                                </div>
                            </div> : <Content />
                    }
                </div>
            </div>
        )
    }
}

export default Banner;