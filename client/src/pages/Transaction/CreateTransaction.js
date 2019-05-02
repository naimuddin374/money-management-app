import React from 'react'
import Modal from 'react-modal'

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

class CreateTransaction extends React.Component {
    state = {
        type: '',
        amount: '',
        note: ''
    }
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let { type, amount, note } = this.state
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.isClose}
                style={customStyles}
            >
                <form>
                    <label><h3>Create a New Transaction</h3></label>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="form-control"
                            id="type"
                            name="type"
                            onChange={this.changeHandler}
                        >
                            <option value="">Select a Type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            onChange={this.changeHandler}
                            placeholder="Amount"
                        />
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
export default CreateTransaction