import React, {Component} from 'react';
import $ from 'jquery';
import * as firebase from 'firebase';
import moment from 'moment';
import Spinner from '../components/objects/spinner';
import Modal from 'boron/DropModal';

import LogoAndMenu from '../components/components/logo-and-menu';
import BannerHeader from '../components/components/banner-header';
import LastPosts from '../components/components/last-posts';
import Footer from '../components/components/footer';
class Home extends Component {

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
        this.refs.modal.show();
        let context = this;
        setTimeout(function () {
            context.refs.modal.hide();
        }, 3000);
        document.getElementById("inputName").blur();
        document.getElementById("inputEmail").blur();

        let userName = this.state.userName.trim();
        let userEmail = this.state.userEmail.trim();


        if (this.shouldSubmitForm(userName, userEmail)) {
            context.setState({
                isLoading: true,
            });
            firebase.database().ref('leads/').orderByChild("email").equalTo(userEmail).once("value", function (snapshot) {
                var userData = snapshot.val();
                if (userData) {
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

            // window.open('https://goo.gl/G3ytNP');
        } else {
            this.setState({
                isLoading: false,
                isError: true,
                errorMessage: 'Formato de informações incorreto.',
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
        let isError = this.state.isError;

        const modalStyle = {
            maxHeight: '90vh',
            width: 'auto',
            maxWidth: '650px',
            padding: '25px',
            paddingTop: '0px',
            paddingBottom: '0px',
            textAlign: 'center'
        };

        return (
            <div id="p-blog-home">
                <div id="header" className="min-header-main-screen">
                    <div id="top-header">
                        VOAAI.COM - Todos direitos reservados - 2017
                    </div>
                    <div className="container">
                        <LogoAndMenu />
                        <BannerHeader
                            onInputUserNameChange={this.onInputUserNameChange.bind(this)}
                            onInputEmailChange={this.onInputEmailChange.bind(this)}
                            onSubmitForm={this.submitForm.bind(this)}
                            emailValue={this.state.userEmail}
                            userNameValue={this.state.userName}
                            isLoading={this.state.isLoading}
                            isError={this.state.isError}
                            errorMessage={this.state.errorMessage}/>
                    </div>
                </div>
                <LastPosts isMainPage={true}/>
                <Footer/>
                <Modal ref="modal"
                       keyboard={false}
                       closeOnClick={true}
                       modalStyle={modalStyle}>
                    <p style={{textAlign: 'center'}}><Spinner/></p>
                </Modal>
            </div>)
    }
}

export default Home;