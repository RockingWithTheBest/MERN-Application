import express from 'express';
import cors from 'cors';
import bodyParse from 'body-parser';;
import mongoose from 'mongoose';
import Client from './model/client.js'
import Cashier from './model/cashier.js'
import Transaction from './model/transaction.js'
import Currencies from './model/currency.js';

mongoose.connect('mongodb://localhost:27017/CurrencyExchange')
.then(()=>console.log('MongeDb connected successfully!'))
.catch(err => console.log('MongeDb connection error : ' + err))


const app = express();

app.use(cors());

app.use(bodyParse.json());
const post  = 1000;

app.get('/', (req, res) => { 
    res.send('Hello, World!');
})



//Currency
app.post('/currency', async (req, res) => {
    try{
        const currency = await Currencies.create({
            currency_name: req.body.currency_name,
            selling_rate: req.body.selling_rate,
            buying_rate: req.body.buying_rate
        })
        res.json({status: 'ok', currency});
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})
app.get('/currency', async(req, res)=>{
    try{
        const currency = await Currencies.find();
        res.status(201).json({ status: 'success', currency});
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.get('/currency/:id', async (req,res) => {
    try{
        const currency = await Currencies.findById(req.params.id);
        res.status(201).json({ status: 'success', currency });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.put('/currency/:id', async (req, res) => {
    try{
        const currency = await Currencies.findByIdAndUpdate(req.params.id, 
            {
                currency_name: req.body.currency_name,
                selling_rate: req.body.selling_rate,
                buying_rate: req.body.buying_rate}, 
            {   
                new: true, 
                runValidators: true
        });
        res.status(201).json({ status: 'success', currency });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.delete('/currency/:id', async (req, res) => {
    try{
        await Currencies.findByIdAndDelete(req.params.id);
        res.status(201).json({ status: 'success', message:'Successfully deleted' });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})


//Cashier
app.get('/cashier', async(req, res) => {
    try{
        const cashier = await Cashier.find();
        res.status(201).json({ status: 'success', cashier});
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/cashier', async (req, res) => {
    try{
        const cashier = await Cashier.create(
            {   
                full_name: req.body.full_name,
                password: req.body.password
            }
        )
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error in posting data');
    }

})

app.get('/cashier/:id', async (req, res) => {
    try{
        const cashier = await Cashier.findById(req.params.id)
        res.status(200).json({status:":success", cashier})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }    
})

app.put('/cashier/:id', async(req, res) => {
    try{
        const cashier = await Cashier.findByIdAndUpdate(req.params.id,
            {
                full_name: req.body.full_name,
                password: req.body.password
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.status(200).json({status:":success", cashier})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.delete('/cashier/:id', async (req, res) => {
    try{
        await Cashier.findByIdAndDelete(req.params.id);
        res.status(200).json({status:":success", message: 'Successfully deleted'})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})


//Client
app.post('/client', async (req, res) => {
    try{
        const client = await Client.create(
            {   
                full_name: req.body.full_name,
                passport_number: req.body.passport_number
            }
        )
        res.status(201).json({ status: 'ok', client });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error in posting data');
    }
})

app.get('/client', async(req, res) => {
    try{
        const client = await Client.find();
        res.status(201).json({ status: 'ok', client });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.get('/client/:id', async (req, res) => {
    try{
        const client = await Client.findById(req.params.id)
        res.status(200).json({status:":success", client})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.put('/client/:id', async(req, res) => {
    try{
        const client = await Client.findByIdAndUpdate(req.params.id,
            {
                full_name: req.body.full_name,
                passport_number: req.body.passport_number
            },
            {
                new: true,
                runValidators: true
            }
        )
        res.status(200).json({status:":success", client})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.delete('/client/:id', async (req, res) => {
    try{
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({status:":success", message: 'Successfully deleted'})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

//Transactions
app.post('/transaction', async (req, res) => {
    try{
        const transaction = await Transaction.create({
            client_id: req.body.client_id,
            cashier_id: req.body.cashier_id,
            sold_amount: req.body.sold_amount,
            bought_amount: req.body.bought_amount,
            transaction_time: req.body.transaction_time,
            transaction_date: req.body.transaction_date,
            bought_currency_code: req.body.bought_currency_code,
            sold_currency_code: req.body.sold_currency_code
        })
        res.status(201).json({ status: 'ok', transaction });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error in posting data');
    }
})

app.get('/transaction', async(req, res) => {
    try{
        const transaction = await Transaction.find();
        res.status(201).json({ status: 'ok', transaction });
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.get('/transaction/:id', async (req, res) => {
    try{
        const transaction = await Transaction.findById(req.params.id)
        res.status(200).json({status:":success", transaction})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.put('/transaction/:id', async(req, res) => {
    try{
        const transaction = await Transaction.findByIdAndUpdate({
            client_id: req.body.client_id,
            cashier_id: req.body.cashier_id,
            sold_amount: req.body.sold_amount,
            bought_amount: req.body.bought_amount,
            transaction_time: req.body.transaction_time,
            transaction_date: req.body.transaction_date,
            bought_currency_code: req.body.bought_currency_code,
            sold_currency_code: req.body.sold_currency_code
        },
        {
            new: true,
            runValidators: true
        }
        )
        res.status(200).json({status:":success", transaction})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})

app.delete('/transaction/:id', async (req, res) => {
    try{
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({status:":success", message: 'Successfully transaction deleted'})
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
})
app.listen(post, (req, res) => {
    console.log(`Server is running on port http://localhost:${post}`);
})