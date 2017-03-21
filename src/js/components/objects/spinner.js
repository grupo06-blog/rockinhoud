import React, { Component } from 'react';

class Spinner extends Component {

    render() {
        return (
            <i className={'fa fa-spinner fa-pulse fa-fp fa-fw spinner black'}/>
        );
    }
}

Spinner.defaultProps = {
    className: '',
};

Spinner.propTypes = {
    className: React.PropTypes.string,
};

export default Spinner;