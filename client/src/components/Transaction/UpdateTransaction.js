import React from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux';
import { updateTransaction } from '../../store/actions/transactionActions'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: "500px",
        transform: 'translate(-50%, -50%)'
    }
}

class UpdateTransaction extends React.Component {
    state = {
        amount: '',
        note: '',
        error: {},
        alertMsg: '',
        isSuccess: ''
    }
    componentDidMount() {
        this.setState({
            amount: this.props.transaction.amount,
            note: this.props.transaction.note,
        })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.transactions.error) !== JSON.stringify(prevState.error)) {
            return {
                error: nextProps.transactions.error,
                alertMsg: nextProps.transactions.message,
                isSuccess: nextProps.transactions.isSuccess
            }
        } else {
            return {
                alertMsg: nextProps.transactions.message,
                isSuccess: nextProps.transactions.isSuccess
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
        this.props.updateTransaction(this.props.transaction._id, {
            amount: this.state.amount,
            note: this.state.note,
        })
        this.props.isClose()
    }
    render() {
        let { amount, note, error, alertMsg, isSuccess } = this.state
        let alertMsgDiv;
        if (isSuccess) {
            alertMsgDiv = <div className="alert alert-success">{alertMsg}</div>
        } else {
            alertMsgDiv = <div className="alert alert-danger">{alertMsg}</div>
        }
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={customStyles}
            >
                {alertMsg && alertMsgDiv}
                <form onSubmit={this.submitHandler}>
                    <label><h3>Update Transaction</h3></label>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            className={error.amount ? 'form-control is-invalid' : 'form-control'}
                            id="amount"
                            name="amount"
                            onChange={this.changeHandler}
                            placeholder="Amount"
                            value={amount}
                        />
                        {error.amount && <div className="invalid-feedback">
                            {error.amount}
                        </div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note</label>
                        <textarea
                            type="number"
                            className="form-control"
                            id="note"
                            name="note"
                            onChange={this.changeHandler}
                            placeholder="Note"
                            value={note}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" >Submit</button>
                        <button onClick={this.props.isClose} className="btn btn-danger float-right" >Close</button>
                    </div>
                </form>
            </Modal>
        )
    }
}


const mapStateToProps = state => ({
    transactions: state.transactions
})
export default connect(mapStateToProps, { updateTransaction })(UpdateTransaction)