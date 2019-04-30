import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../store/actions/authActions'

class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
        let { name, email, password, confirmPassword } = this.state
        this.props.register({ name, email, password, confirmPassword }, this.props.history)
    }

    render() {
        let { name, email, password, confirmPassword, error } = this.state
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {error.message && <div class="alert alert-danger">
                        {error.message}
                    </div>}
                    <form onSubmit={this.submitHandler}>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                className={error.name ? 'form-control is-invalid' : 'form-control'}
                                id="name"
                                onChange={this.changeHandler}
                                value={name}
                                placeholder="Enter Name"
                            />
                            {error.name && <div className="invalid-feedback">
                                {error.name}
                            </div>}
                        </div>
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
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className={error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                                id="confirmPassword"
                                onChange={this.changeHandler}
                                value={confirmPassword}
                                placeholder="Enter Confirm Password"
                            />
                            {error.confirmPassword && <div className="invalid-feedback">
                                {error.confirmPassword}
                            </div>}
                        </div>
                        <div className="form-group">
                            <p>
                                <Link to='/login'>Already Have an Account? Login Here. </Link>
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

export default connect(mapStateToProps, { register })(Register)