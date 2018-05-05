#!/usr/bin/env node

var program = require('commander');

program
    .version('0.0.1')
    .usage('<encrpyt js object file>')
    .option('-f, --file [path]', 'encrpyt file')
    .option('-v, --var [name]', 'var name')
    .option('-p, --password [password]', 'encrypt password')
    .option('-o, --output [file]', 'output file path')
    .parse(process.argv);

    console.log(program.file);   
if(!program.file) {
    program.help();
} else {
    var file = program.file
    var varName = program.var
    var password = program.password
    var output = program.output
    encryFile(file,varName,password,output)
}

function encryFile(filePath, varName, pwd, output) {
    fs = require('fs');
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        eval(data)
        var varValue = eval(varName)
        var finalResult = ''
        if (varValue instanceof Array) {
            var ary = []
            for(emObj of varValue) {
                ary.push(encrpyt(emObj, pwd))
            }
            finalResult = JSON.stringify(ary);
        }
        else if((varValue instanceof Object)) {
            finalResult =  encrpyt(data, pwd)
        }

        finalResult = "var " + varName + " = " + finalResult

        var finalOutput = output 
        if(!output) {
            finalOutput = filePath + "ep" 
        }
        fs.writeFileSync(finalOutput, finalResult , 'utf-8'); 

    });
}


function encrpyt(obj, pwd) {
    var encrypter = require('object-encrypter');
    var engine = encrypter(pwd, {ttl: true});

    var hex = engine.encrypt(obj, 5000); // generated string will live 5 seconds
    return hex
}
