import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import '../Auth/Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';

import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    // muốn viết một component, thì import component từ react
    //constructor
    constructor(props) { //hàm tạo, khi component trước khi chạy thì chạy vào constructor
        super(props);
        //khai báo trạng thái
        this.state = {
            //tạo hai biến quản lí obj
            //state luôn luôn obj
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        console.log('username:', this.state.username, 'password : ', this.state.password)
        // console.log('username:' + this.state.username)
        // console.log('password : ' + this.state.password)
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })

            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }



        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }

            console.log('hoianhpham', e.response)

        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }


    render() {
        //code theo JSX


        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div></div>
                        <div className="col-12 text-login">Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type="text" value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}
                                placeholder='Enter your username' className="form-control" />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    //event của html 
                                    //mục tiêu lấy giá trị của input
                                    placeholder='Enter your password' >

                                </input>

                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword()
                                    }}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>

                                </span>

                            </div>

                        </div>
                        <div className='co-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => { this.handleLogin() }}
                                className='btn-login'>
                                Login
                            </button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>

                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className="text-other-login">Or Login with:</span>

                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
