import React, {Component} from 'react';

import LastPostsItem from '../objects/last-posts-item';
import posts from '../../content/posts';

import {goToAllEbooks} from '../../helpers/go-to';

class LastPosts extends Component {

    render() {
        return (
            <div className="container">
                <div id="c-last-news">
                    {this.props.isMainPage ? posts.map(function (item, key) {
                            if(key < 5) {
                                return <LastPostsItem data={item} key={key}/>
                            }
                        }) : posts.map(function (item, key) {
                            return <LastPostsItem data={item} key={key}/>
                        })}
                </div>
            </div>
        )
    }
}

LastPosts.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default LastPosts;