import React, { Component } from 'react'
import { signUp } from './fetch-utils';

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        error: 'please enter valid email and password'
    }
    handleSubmit = async e => {
        e.preventDefault();
        try {
        const { token } = await signUp(this.state.email, this.state.password);

        this.props.handleTokenChange(token);

        this.props.history.push('/login');
        } catch (e) {
        alert(this.state.error)
        }
    }

    
    render() {
        console.log(this.state);
       
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:<input onChange={e => this.setState({ email: e.target.value})}/>
                    </label>
                    <label>Password:<input onChange={e => this.setState({ password: e.target.value})}/></label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
