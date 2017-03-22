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
                        ROCHINHOUD.COM - Todos direitos reservados - 2017
                    </div>
                    <div className="container">
                        <LogoAndMenu />
                    </div>
                </div>
                <div id="quem-somos-container" className="container">
                    <h2>Contato</h2>
                    <p>Olá, se você tem alguma dúvida ou sugestão entre em contato com a gente através do email:<br/><br/>  rockinhound@gmail.com <br/><br/>  ou através da nossa página no Facebook</p>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default BlogPost;