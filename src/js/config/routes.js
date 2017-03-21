import React from 'react'
import { Router, Route, hashHistory, IndexRoute  } from 'react-router'
/**
 * Helpers
 */

import ThemedApp from '../App';

/**
 * Pages
 */
import BlogHome from '../pages/blog-home';
import BlogPost from '../pages/blog-post';
import BlogQuemSomos from '../pages/blog-quem-somos';
import BlogAllPosts from '../pages/blog-all-posts';
import BlogAllEbooks from '../pages/blog-all-ebooks';

function Routes () {
    return (
        <Router history={hashHistory}>
            <Route path='/' component={ThemedApp}>
                <IndexRoute component={BlogHome}/>
                <Route path='home' component={BlogHome}/>
                <Route path='all-posts' component={BlogAllPosts}/>
                <Route path='quem-somos' component={BlogQuemSomos}/>
                <Route path='post' component={BlogPost}/>
                <Route path='all-ebooks' component={BlogAllEbooks}/>
            </Route>
        </Router>
    );
};

export default Routes;