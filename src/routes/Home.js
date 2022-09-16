import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        // check tiếp đã login hay chưa
        //nếu đã login rồi
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/login';
        // 'a: b' nếu login rồi hì thực hiện link a, còn chưa login thực hiện login  
        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
