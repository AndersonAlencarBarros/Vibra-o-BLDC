const express = require('express');
const app =express();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();


//Static Files
app.use(express.static('public'))
app.use('/css',express.static(__dirname + '/public/css'))
app.use('/js',express.static(__dirname + '/public/js'))
app.use('/img',express.static(__dirname + '/public/img'))

//Set views
app.set('views', './views')
app.set('view engine', 'ejs')

//Routes
app.get('/home',(req,res)=>{
    res.render('index')
})
app.get('',(req,res)=>{
    res.render('index')
})

app.get('/graphs',(req,res)=>{
    res.render('graphs')
})
app.get('/simular',(req,res)=>{
    res.render('simular')
})

httpServer.listen(3000,()=>{
    console.log('server na porta 3000')
});//Iniciando o server, vai escutar na porta indicada



//Comunicaçaõ com Arduino

const mySerial = new SerialPort('COM3',{
   boudRate: 9600 
}); //primeiro parametro e a porta conectada ao arduino segundo parametro e um objeto para configuração

mySerial.on('open',function(){
    console.log('Porta serial aberta')
}); //Semelhança jQuery=on()

mySerial.on('data',function(data){

    console.log(data.toString());
    io.emit('arduino : data',{
        value : data.toString()
    });

}); //Monstrar os dados recebidos pelo arduino

