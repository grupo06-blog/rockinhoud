import React, {Component} from 'react';
import {goToPost} from '../../helpers/go-to';

class LastPostsItem extends Component {
    render() {
        let id = this.props.data.id;
        return (
            <a onClick={goToPost.bind(this, id)}>
                <div className="last-news-item">
                    <img src={this.props.data.image} className="image-post" alt="New Item"/>
                    <div className="info-post">
                        <h2>{this.props.data.title}</h2>
                        <p>{this.props.data.description}</p>
                    </div>
                </div>
            </a>
        )
    }
}

LastPostsItem.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default LastPostsItem;