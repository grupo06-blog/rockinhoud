import React, {Component} from 'react';

import LogoAndMenu from '../components/components/logo-and-menu';
import posts from '../content/posts';
import Footer from '../components/components/footer';


class BlogPost extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        return (
            <div id="p-quem-somos">
                <div id="header">
                    <div id="top-header">
                        VOAAI.COM - Todos direitos reservados - 2017
                    </div>
                    <div className="container">
                        <LogoAndMenu />
                    </div>
                </div>
                <div id="quem-somos-container" className="container">
                    <h2>Quem somos</h2>
                    <p>Olá, se você chegou até o nosso blog é porque se interessa por viagens ;) <br/><br/>
                    Então, seja bem-vindo (a) ao Voa Aí. Somos uma equipe formada por pessoas comuns que desejam
                        compartilhar suas experiências sobre viagens.<br/><br/>
                    Aqui você encontrará dicas de destinos, planejamento de viagens, roteiros e claro, formas de
                        economizar, antes, durante e depois cada viagem.  Conheça nossa equipe:</p>
                    <ul>
                        <li>Bruna Seewald</li>
                        <li>Gabriela Musacchio </li>
                        <li>Gleidistone Silva </li>
                        <li>Rafael Câmara </li>
                        <li>Luciano Albuquerque </li>
                        <li>Matheus Reis</li>
                        <li>Matheus Soares </li>
                        <li>Raiane Costa</li>
                    </ul>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default BlogPost;