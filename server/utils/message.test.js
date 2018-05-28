var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message.js');
describe('generateMessage', ()=> {
    it('should generate correct message obj', ()=>{
        var from = "steven@gmail.com";
        var text = "welcome to the site";
        
     var res = generateMessage(from,text);
        expect(res).toInclude({from,text});
        expect(res.createdAt).toBeA('number');
    })
});

describe('generateLocationMessage', ()=>{
    it('should return object with location url', ()=>{
        var from = 'steven';
        var lat = 53;
        var long = 2;
        var url = 'https://www.google.com/maps?q=53,2';
        var res = generateLocationMessage(from,lat,long);
        console.log(res);
        expect(res).toInclude({from, url});
        expect(res.createdAt).toBeA('number');
        expect(res.url).toBeA('string');

    });
});
