var expect = require('expect');
var {generateMessage} = require('./message.js');
describe('generateMessage', ()=> {
    it('should generate correct message obj', ()=>{
        var from = "steven@gmail.com";
        var text = "welcome to the site";
        
     var res = generateMessage(from,text);
        expect(res).toInclude({from,text});
        expect(res.createdAt).toBeA('number');
    })
});