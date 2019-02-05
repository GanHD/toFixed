function toFixed(number, roundingDigit){
  //Fixes roundingDigit if something other than a int is passed through
  if(isNaN(roundingDigit)) roundingDigit =0;
  if(roundingDigit === true) roundingDigit =1;
  //if roundingDigit is not a whole number recurse.
  if(roundingDigit % 1 !== 0) roundingDigit = parseInt(toFixed(roundingDigit));


  fixedNumber = number.toString();
  if(fixedNumber.match("-")){
    fixedNumber =fixedNumber.replace("-","");
    var isNegative = true;
  }

  var decimalIndex = fixedNumber.indexOf(".");
  //if theres no decimal point, default to positive 1
  if(decimalIndex<0) decimalIndex = 1;

  //Moves the decimal place so that fixedNumber = fixedNumber ^ roundingDigit
  fixedNumber = fixedNumber.replace(".","");
  fixedNumber = fixedNumber.substr(0, decimalIndex+roundingDigit) + "." + fixedNumber.substr(decimalIndex+roundingDigit);

  //rounds
  fixedNumber = Math.round(parseFloat(fixedNumber))
  //turns fixedNumber into a string without a decimalpoint
  fixedNumber = fixedNumber.toString();
  //adds 0 to before the decimalpoint if fixedNumber is a decimal integer
  if(number<=1 && number>=-1 && fixedNumber.length >1){
    fixedNumber = "0"+fixedNumber;
  }

  //Adds back the decimal point if there are digits in the decimal places
  if(fixedNumber.substr(decimalIndex))  {
     var toReturn = fixedNumber.substr(0, decimalIndex) + "." + fixedNumber.substr(decimalIndex);

     /* ADD ADDITIONAL ZEROS IF NEEDED*/
     //creates a sting of all the digits that are decimals
     var decimals = fixedNumber.substr(decimalIndex+1);
     //If toFixed roundingDigit is greater than the amount of decimal digits. Add zeros to the end
     for(var i =0; i < roundingDigit - decimals.length - 1;i++){
          toReturn+='0';
        }
      if(isNegative === true) return "-"+toReturn;
      return toReturn;
  }
  if(roundingDigit>0){
    fixedNumber+="."
    //adds additional zeroes if needed
    for(var i =0; i < roundingDigit;i++){
      fixedNumber+='0';
    }
  }
  if(isNegative === true) return "-"+fixedNumber;
  return fixedNumber
}
