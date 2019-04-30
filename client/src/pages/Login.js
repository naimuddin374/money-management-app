import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../store/actions/authActions'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: ''
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.auth.error
            }
        }
        return null
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault()
        let { email, password } = this.state
        this.props.login({ email, password }, this.props.history)
    }

    render() {
        let { email, password, error } = this.state
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {error.message && <div class="alert alert-danger">
                        {error.message}
                    </div>}
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={error.email ? 'form-control is-invalid' : 'form-control'}
                                id="email"
                                onChange={this.changeHandler}
                                value={email}
                                placeholder="Enter Email"
                            />
                            {error.email && <div className="invalid-feedback">
                                {error.email}
                            </div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={error.password ? 'form-control is-invalid' : 'form-control'}
                                id="password"
                                onChange={this.changeHandler}
                                value={password}
                                placeholder="Enter Password"
                            />
                            {error.password && <div className="invalid-feedback">
                                {error.password}
                            </div>}
                        </div>

                        <div className="form-group">
                            <p>
                                <Link to='/register'>Don't Have an Account? Register Here. </Link>
                            </p>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { login })(Login)