import mongoose from "mongoose";

const CurrencySchema = new mongoose.Schema({
    currency_name: {
        type: String,
        required: true,
    },
    selling_rate:{
        type: Number,
        required: true,
    },
    buying_rate:{
        type: Number,
        required: true,
    }
},{
    collection :'currencies-data'
});

const Currencies  = mongoose.model('Currencies', CurrencySchema);
export default Currencies;