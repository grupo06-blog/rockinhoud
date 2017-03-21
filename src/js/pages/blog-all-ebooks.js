import React, {Component} from 'react';

import LogoAndMenu from '../components/components/logo-and-menu';
import ebooks from '../content/ebooks';
import Footer from '../components/components/footer';

class BlogAllEbooks extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        return (
            <div id="p-blog-post">
                <div id="header">
                    <div id="top-header">
                        VOAAI.COM - Todos direitos reservados - 2017
                    </div>
                    <div className="container">
                        <LogoAndMenu />
                    </div>
                </div>
                <div className="container">
                    <div id="c-last-news">
                        {ebooks.map(function (item, key) {
                            return <a key={key} href={item.href} target="_blank">
                                <div className="last-news-item">
                                    <img src={item.image} className="image-post" alt="New Item"/>
                                    <div className="info-post">
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </a>
                        })}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default BlogAllEbooks;