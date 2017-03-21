import React, {Component} from 'react';
import $ from 'jquery';
import * as firebase from 'firebase';
import moment from 'moment';
import Spinner from '../components/objects/spinner';
import Modal from 'boron/DropModal';

import LogoAndMenu from '../components/components/logo-and-menu';
import posts from '../content/posts';
import Footer from '../components/components/footer';

class BlogPost extends Component {

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

    componentDidMount() {
        window.scrollTo(0, 0);
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

    getEntirePost(id) {
        let data;
        posts.map(function (item) {
            if (item.id === parseInt(id, 10)) {
                data = {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    content: item.content
                };
            }
        });
        return data;
    }

    render() {
        let postData = this.getEntirePost(this.props.location.query.id);

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
            <div id="p-blog-post">
                <div id="header">
                    <div id="top-header">
                        VOAAI.COM - Todos direitos reservados - 2017
                    </div>
                    <div className="container">
                        <LogoAndMenu />
                        <div className="container">
                            <div id="form-submit" className="row">

                                <div className="col s6">
                                    <input
                                        ref="inputName"
                                        placeholder="Nome Completo"
                                        className="input-field"
                                        id="inputName"
                                        type="text"
                                        value={this.state.userName}
                                        onChange={this.onInputUserNameChange.bind(this)}
                                    />
                                </div>
                                <div className="col s6">
                                    <input placeholder="Email"
                                           className="input-field"
                                           type="email"
                                           id="inputEmail"
                                           value={this.state.userEmail}
                                           onChange={this.onInputEmailChange.bind(this)}
                                    />
                                </div>
                                <div className="col s12">
                                    <div id="btn-submit">
                                        <a id="default-btn" onClick={this.submitForm.bind(this)}>
                                            Receber dicas sobre viagens!
                                        </a>
                                    </div>
                                </div>
                                <div className="col s12">
                                    {isError ? <div id="msg" className="row">
                                            {this.state.errorMessage}
                                        </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="post-container" className="container">
                    {postData.content.map(function (item, key) {
                        return <p key={key} dangerouslySetInnerHTML={{__html: item}}></p>
                    })}
                </div>
                <Footer/>
                <Modal ref="modal"
                       keyboard={false}
                       closeOnClick={true}
                       modalStyle={modalStyle}>
                    <p style={{textAlign: 'center'}}><Spinner/></p>
                </Modal>
            </div>
        )
    }
}

export default BlogPost;