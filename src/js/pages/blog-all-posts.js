import React, {Component} from 'react';
import Spinner from '../components/objects/spinner';
import Modal from 'boron/DropModal';

import LogoAndMenu from '../components/components/logo-and-menu';
import LastPosts from '../components/components/last-posts';
import Footer from '../components/components/footer';

class BlogAllPosts extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
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
                        ROCK INHOUD - Todos direitos reservados - 2017
                    </div>
                    <div className="container">
                        <LogoAndMenu />
                    </div>
                </div>
                <LastPosts isMainPage={false} />
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

export default BlogAllPosts;