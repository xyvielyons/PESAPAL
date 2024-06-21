import axios from "axios"
export const authorization = async(req,res,next)=>{
 try {
    const Request ={
        consumer_key:"sqm9dh4edcLjZ9E7dvW1xwwQw8AHpi9O",
        consumer_secret:"Tl6MUQ8D9cl3ij2bCJgZxBpIQ48="
    }
    const headers = {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
    const apiUrl = 'https://pay.pesapal.com/v3/api/Auth/RequestToken'
    const resp = await axios.post(apiUrl,Request,{headers})
    // res.status(200).json({
    //     status:"success",
    //     message:resp.data
    // })
    req.pesapalaccesstoken = resp.data.token
    
    next()



 } catch (error) {
    res.status(500).json({
        status:"An error was encountered",
        error


    })
    
 }
}
export const IPNURL = async(req,res,next)=>{
    try {
        const pesapaltoken = await req.pesapalaccesstoken
        const IPNURLREGISTER = 'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN'
        const headers = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':`${pesapaltoken}`
        }
        const requestObject = {
            url:"http://localhost:3005/pesapal",
            ipn_notification_type:"POST"
        }
        const response = await axios.post(IPNURLREGISTER,requestObject,{headers})

       res.status(200).json({
        status:"success",
        message:response.data

       })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            message:error
    
           })        
    }

}
export const payment = async(req,res,next)=>{
    try {
        const pesapaltoken = await req.pesapalaccesstoken
    const SubmitOrderRequestUrl = 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
    const headers = {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':`${pesapaltoken}`
    }
    const requestPaymentObject ={
        "id": "AA1122-3344ZZ66787",
        "currency": "KES",
        "amount": 1,
        "description": "your testing the api you built",
        "callback_url": "https://www.google.com",
        "redirect_mode": "",
        "notification_id": "5d3c1d35-f723-4bcc-b04c-dd164745bc43",
        "branch": "Store Name - HQ",
        "billing_address": {
            "email_address": "john.doe@example.com",
            "phone_number": "0728440683",
            "country_code": "KE",
            "first_name": "John",
            "middle_name": "",
            "last_name": "Doe",
            "line_1": "chege the enginneer 😃",
            "line_2": "pay",
            "city": "",
            "state": "",
            "postal_code": "",
            "zip_code": ""
        }

       
    }  
    const response = await axios.post(SubmitOrderRequestUrl,requestPaymentObject,{headers})  
    res.status(200).json({
        message:response.data
    })
        
    } catch (error) {
        res.status(500).json({
            error
        })
        
    }
    
}