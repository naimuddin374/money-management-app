import React from 'react'
import { connect } from 'react-redux'
import { loadTransactions, removeTransaction } from '../../store/actions/transactionActions'
import CreateTransaction from './CreateTransaction'
import UpdateTransaction from './UpdateTransaction'

class Transaction extends React.Component {

    componentDidMount() {
        this.props.loadTransactions()
    }

    state = {
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }
    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }
    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }
    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    render() {
        let tran = [
            {
                "_id": "ADF2555ADFA",
                "amount": 1000,
                "type": "Income",
                "note": "This is default data"
            }
        ]
        let { auth, transactions } = this.props
        let trans = transactions || tran
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">

                    <h1>Hello, {auth.user.name}</h1>
                    <p>Your email address {auth.user.email}</p>
                    <br />
                    <button
                        className="btn btn-success"
                        onClick={this.openCreateModal}
                    >
                        Add New
                    </button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        isClose={this.closeCreateModal}
                    />
                    <br />
                    <ul className="list-group">
                        {trans.length > 0 ?
                            trans.map(transaction => (
                                <li className="list-group-item" key={transaction._id}>
                                    <p><b>Type:</b> {transaction.type}</p>
                                    <p><b>Amount:</b> {transaction.amount}</p>
                                    <p><b>Note:</b> {transaction.note}</p>
                                    {
                                        transaction._id === this.state.id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateModalOpen}
                                                isClose={this.closeUpdateModal}
                                                transaction={transaction}
                                            /> : null
                                    }
                                    <button
                                        onClick={() => this.props.removeTransaction(transaction._id)}
                                        className="btn btn-danger"
                                    >
                                        Remove
                                        </button>

                                    <button
                                        onClick={() => this.openUpdateModal(transaction._id)}
                                        className="btn btn-primary"
                                    >
                                        Edit
                                        </button>
                                </li>
                            )) : null
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions.transactionData
})

export default connect(mapStateToProps, { loadTransactions, removeTransaction })(Transaction)
