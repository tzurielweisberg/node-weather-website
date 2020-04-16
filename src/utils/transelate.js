const request = require('request');


const transelate = (lang, value, callback) => {
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + lang + '&dt=t&q='  + encodeURIComponent(value) ;
  console.log('url is : ' + url);
  request({ method: 'GET', url, json: true }, (error, { body }={}) => {
    if (error) {
      console.log("ERROR");
      callback('Transelate did not succeed', {})
    } else {
      let returnVal = body[0][0][0];
      callback(undefined, {
        transelatedValue: returnVal
      })
    }
  })
}

module.exports = transelate;












//  const transelateUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=he&dt=t&q=hello'
//  // + 
//  //body.daily.data[0].summary + '\"';

//  console.log(transelateUrl);

//  request(
//    {method: 'POST', url: transelateUrl, json : true}, (error, {body} )=>{
//    if (error) {console.log(error)}

//    console.log('body[0][0][0] is ' + body[0][0][0]);
//    let bodyTrans = body[0][0][0];
//    }
//  )