const express = require('express');
const path = require('path');
const fs=require('fs')

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import App from './src/App'

const app = express();
const port = process.env.PORT || 3000;

app.use('^/$',(req,res,next)=>{
    fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
        if(err){
            console.log(err)
            return res.status(500).send("Error!")
        }
        return res.send(data.replace('<div id="root"></div>',`<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`))
    })
});

app.get('/redirectTestnet', (req, res) => {
    const externalURL = 'https://testnet.mynearwallet.com/create'; 
    res.redirect(externalURL);
  });

app.get('/redirectMainnet', (req, res) => {
    const externalURL = 'https://app.mynearwallet.com/create'; 
    res.redirect(externalURL);
  });

app.use(express.static(path.resolve(__dirname,'build')))  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
