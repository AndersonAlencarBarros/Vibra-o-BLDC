const express = require('express');
const socketIo= require('socket.io');
const http=require('http');


const app =express();
const server = http.createServer(app);
const io = socketIo.listen(server)

const SerialPort = require('serialport');
const ReadLine = SerialPort.parses.Readline;
const parser = newReadline();


app.get('/', (req,res,next) =>{

    res.sendFile(__dirname + '')//Segundo parametro e o caminho para o html 
});// Criando a rota do servidor , Mandando o html a ser aberto pelo servidor


const mySerial = new SerialPort('',{
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

server.listen(3000,()=>{
    console.log('server na porta 3000')
});//Iniciando o server, vai escutar na porta indicada


 

