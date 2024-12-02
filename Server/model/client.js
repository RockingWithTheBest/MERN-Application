import mongoose from 'mongoose';

const ClientSchemma = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    passport_number:{
        type: String,
        required: true
    }
},
    { collection :'client-data'}
);

const Client = mongoose.model('Clients',ClientSchemma);
export default Client;
