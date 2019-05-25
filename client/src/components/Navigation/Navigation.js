import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'

class Navigation extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" exact>
                    <span className="navbar-brand">Money APP</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    dataToggle="collapse"
                    dataTarget="#nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" activeClassName="active" exact>
                                <span className="nav-link">Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" activeClassName="active">
                                <span className="nav-link">About</span>
                            </NavLink>
                        </li>
                        {
                            this.props.auth.isAuthenticated ?
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/transactions" activeClassName="active">
                                            <span className="nav-link">Transaction</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <span
                                            onClick={() => this.props.logout(this.props.history)}
                                            className="nav-link btn"
                                        >Logout</span>
                                    </li>
                                </React.Fragment> :
                                <React.Fragment>
                                    <li className="nav-item">
                                        <NavLink to="/register" activeClassName="active">
                                            <span className="nav-link">Register</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" activeClassName="active">
                                            <span className="nav-link">Login</span>
                                        </NavLink>
                                    </li>
                                </React.Fragment>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(withRouter(Navigation))