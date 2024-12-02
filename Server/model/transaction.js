import mongoose from "mongoose";

const Transactions = new mongoose.Schema({
    sold_currency_code:{
        type: String,
        required: true
    },
    bought_currency_code:{
        type: String,
        required: true
    },
    transaction_date:{
        type: Date,
        required: true
    },
    transaction_time:{
        type: String,
        required: false
    },
    sold_amount:{
        type: Number,
        required: true
    },
    bought_amount:{
        type: Number,
        required: true
    },
    cashier_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Cashier',
        required: true
    },
    client_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clients',
        required: false
    }
})

const Transaction = mongoose.model('Transactions', Transactions);
export default Transaction;