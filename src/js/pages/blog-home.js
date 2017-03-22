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
                        ROCK INHOUD - Todos direitos reservados - 2017
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
                <div id="whoWeAre" className="container">
                    <h3>ROCK INHOUD! QUEM SOMOS?</h3>
                    <p>Olá! Somos a RockInhoud, uma startup que ajuda micro e pequenas empresas a
                        desenvolverem sua estratégia de Marketing de Conteúdo, utilizando uma rede de
                        redatores espalhados por todo o Brasil.</p>
                    <p>Que tal criar ou atualizar seu blog? Produzir um conteúdo que eduque e engaje seus clientes
                        sobre seu produto ou serviço? Estamos aqui para te ajudar! Contem com a RockInhoud</p>
                    <div id="servicos">
                        <h3>SERVIÇOS</h3>
                        <p>Nosso foco é fazer que o seu conteúdo gere bons resultados. Como fazermos isso?
                            Por meio do Marketing de Conteúdo ;)</p>
                        <br/>
                        <div className="row">
                            <div className="col s12 m4 item-service left-service">
                                <img src="images/icones_servicos-03.svg" height='120px' />
                                <h4><strong>Blog</strong></h4>
                                <p>Nós desenvolvemos seu blog de forma otimizada, para oferecer a melhor
                                    experiência possível aos seus clientes.</p>
                                <div className="row">
                                    <a href="https://rockinhoud.wordpress.com/" target="_blank">
                                        <strong> Veja como poderá ser seu blog</strong>
                                    </a>
                                </div>
                            </div>
                            <div className="col s12 m4 item-service">
                                <img src="images/icones_servicos-02.svg" height='120px' />
                                <h4><strong>Guia de Marketing de Conteúdo </strong></h4>
                                <p>Tenha acesso a um guia exclusivo, desenvolvido pelos nossos experts em
                                    Marketing de Conteúdo, para te auxiliar na produção de conteúdos exclusivos.
                                </p>
                                <div className="row">
                                    <a href="#" target="_blank">
                                        <strong> Veja o preview do guia</strong>
                                    </a>
                                </div>
                            </div>
                            <div className="col s12 m4 item-service right-service">
                                <img src="images/icones_servicos-01.svg" height='120px' />
                                <h4><strong>Cronograma Inicial</strong></h4>
                                <p>Além disso, receba um Cronograma Inicial para gerar resultados rápidos e
                                    de alta performance.</p>
                                <div className="row">
                                    <a href="#" target="_blank">
                                        <strong> Veja um modelo de cronograma</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="price" className="row">
                            <p>Adquira todos estes três produtos por apenas:</p>
                            <h4 className="old-price"><del>R$ 500,00</del></h4>
                            <h2 className="new-price">R$ 200,00</h2>
                            <p className="promotion">somente até 25/04</p>
                        </div>
                        <div className="row">
                            <div className="col s12 texto-centro">
                                <form action="https://pagseguro.uol.com.br/checkout/v2/payment.html" method="post" target="_blank">
                                    <input type="hidden" name="code" value="43614C86BBBB2C7BB4F8DFB0C3A8E298" />
                                    <input type="hidden" name="iot" value="button" />
                                    <input type="image" src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/209x48-comprar-assina.gif" name="submit" alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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