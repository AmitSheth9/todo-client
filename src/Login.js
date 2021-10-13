import React, { Component } from 'react'
import { logIn } from './fetch-utils';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error: 'incorrect email or pass',
    }

    handleSubmit = async e => {
        e.preventDefault();
        try {
        const { token } = await logIn(this.state.email, this.state.password)
        this.props.handleTokenChange(token);
        this.props.history.push('/todopage')
        }
        catch(e) {
            alert(this.state.error)
        }

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:<input onChange={e => this.setState({ email: e.target.value})}/>
                    </label>
                    <label>Password:<input onChange={e => this.setState({ password: e.target.value})}/></label>
                    <button>Login</button>
                </form>
            </div>
        )
    }
}
