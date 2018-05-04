#!/usr/bin/env node

var program = require('commander');

program
    .version('0.0.1')
    .usage('<encrpyt js object file>')
    .option('-f, --file [path]', 'encrpyt file')
    .option('-v, --var [name]', 'var name')
    .option('-p, --password [password]', 'encrypt password')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {
    console.log(program.file);   
}

function encryFile(filePath, varName) {
    fs = require('fs');
    fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        eval(data)
        var varValue = eval(varName)
        var finalResult 
        if (varValue instanceof Array) {
            for(emObj of varValue) {
                
            }
        }
        else if((varValue instanceof Object)) {
            encrpyt(data)
        }
    });
}


function encrpyt(obj, pwd) {
    var encrypter = require('object-encrypter');
    var engine = encrypter(pwd, {ttl: true});

    var hex = engine.encrypt(obj, 5000); // generated string will live 5 seconds
    return hex
}
