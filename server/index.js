const express = require('express');
const app =express();

const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();



app.get('/', (req,res,next) =>{

    res.sendFile(__dirname + '/index.html')//Segundo parametro e o caminho para o html 
});// Criando a rota do servidor , Mandando o html a ser aberto pelo servidor


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

httpServer.listen(3000,()=>{
     console.log('server na porta 3000')
 });//Iniciando o server, vai escutar na porta indicada