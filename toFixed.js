function toFixed(number, roundingDigit){
  if(isNaN(roundingDigit) || typeof roundingDigit === "String" || roundingDigit === false) roundingDigit =0;
  if(roundingDigit === true) roundingDigit =1;
  if(roundingDigit % 1 !== 0) roundingDigit = toFixed(roundingDigit);

  fixedNumber = number.toString();
  var decimalIndex = Math.abs(fixedNumber.indexOf("."));

  fixedNumber = fixedNumber.replace(".","");
  fixedNumber = fixedNumber.substr(0, decimalIndex+roundingDigit) + "." + fixedNumber.substr(decimalIndex+roundingDigit);

  fixedNumber = parseFloat(fixedNumber).toFixed().replace(".","");
  //adds 0 back in if its a decimal float value
  if(number<=1 && number>=-1 && fixedNumber.length >1){
    fixedNumber = "0"+fixedNumber;
  }

  //if theresany digits after where the decimal should be
  if(fixedNumber.substr(decimalIndex))  {
     var toReturn = fixedNumber.substr(0, decimalIndex) + "." + fixedNumber.substr(decimalIndex);
     //sting of all the digits that are decimals
     var decimals = fixedNumber.substr(decimalIndex+1);
     //If toFixed roundingDigit is greater than the amount of decimal digits. Add zeros to the end
     for(var i =0; i <= roundingDigit-decimals.length;i++){
          toReturn+='0';
        }
      return toReturn;
  }if(roundingDigit>0){
    fixedNumber+="."
    for(var i =0; i < roundingDigit;i++){
      fixedNumber+='0';
    }
  }
  return fixedNumber
}
