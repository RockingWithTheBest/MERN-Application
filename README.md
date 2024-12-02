Соединение к Базц данны
mongoose.connect('mongodb://localhost:27017/CurrencyExchange')
.then(()=>console.log('MongeDb connected successfully!'))
.catch(err => console.log('MongeDb connection error : ' + err))


Запросы таблицы

1. Currencies Схема
   GET - /currency
   POST - /currency
           BODY
           {
              currency_name: req.body.currency_name,
              selling_rate: req.body.selling_rate,
              buying_rate: req.body.buying_rate
           }
   DELETE - /currency/:id
   PUT - /currency/:id

2. Cashier Схема
   GET - /cashier
   POST - /cashier
         BODY
         {   
                full_name: req.body.full_name,
                password: req.body.password
         }
   DELETE - /cashier/id
   PUT - /cashier/id

   3. Transactions Схема
      GET - /transaction
      POST - /transaction
              BODY
              {
                    client_id: req.body.client_id,
                    cashier_id: req.body.cashier_id,
                    sold_amount: req.body.sold_amount,
                    bought_amount: req.body.bought_amount,
                    transaction_time: req.body.transaction_time,
                    transaction_date: req.body.transaction_date,
                    bought_currency_code: req.body.bought_currency_code,
                    sold_currency_code: req.body.sold_currency_code
                }
      DELETE - /transaction/:id
      PUT - /transaction/:id

      4. Clients Схема
         GET - /client
         POST - /client
                BODY
                {   
                    full_name: req.body.full_name,
                    passport_number: req.body.passport_number
                }
         PUT - /client
         DELETE - /client
   
 
