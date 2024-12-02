import mongoose from 'mongoose';

const CashierSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},
    {collection: 'cashier-data'}
)

const Cashier = mongoose.model('Cashier',CashierSchema)
export default Cashier;