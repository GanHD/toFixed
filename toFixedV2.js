function toFixed(number, precision){
  /*Fixes precision if something other than a int is passed through */
  if(isNaN(precision) || precision === "" || precision === false) precision =0;
  if(precision === true) precision =1;
  if (precision < 0 || precision > 20)   throw new RangeError;
  //if precision is not a whole number recurse.
  if(precision % 1 !== 0) precision = parseInt(toFixed(precision));

  var numberString = number.toString();
  var splitNumberString = numberString.split(".");
  var wholeNumberDigits = splitNumberString[0];
  var decimalDigits = splitNumberString[1];

  /* Rounding*/
  if(precision === 0){
    return Math.round(parseFloat(numberString)) + "";
  }
  /*if a integer is passed in as number and precision is greater
  than the decimals already there, then it adds 0s to the end of the int
  ex. toFixed(1,3) => 1.000*/
  if(precision >0 && decimalDigits === undefined){
    var zeroesToAdd="";
    for(var i=0; i < precision; i++){
      zeroesToAdd+="0"
    }
    return wholeNumberDigits + '.' + zeroesToAdd;
  }

  //creates a new str that is used to be rounded
  var toRoundString = decimalDigits.substr(0,precision) + "."
    + decimalDigits.substr(precision);

  //using math round removes zeroes that are in whole number digits.
  //zeroesToAddInDecimalPlaces saves those zeroes
  var splitDecimal = toRoundString.split(".");
  var zeroesToAddInDecimalPlaces = splitDecimal[0].match(/0/g);

  toRoundString = Math.round(parseFloat(toRoundString)) + "";

//in this case a zero is rounded up and a zero must be removed from zeroesToAddInDecimalPlaces
  if(toRoundString === "1"){
      zeroesToAddInDecimalPlaces.splice(zeroesToAddInDecimalPlaces.length -1);
      toRoundString = zeroesToAddInDecimalPlaces.join("") + toRoundString ;
  }
  //else add all of the zeroes
  else if(zeroesToAddInDecimalPlaces){
      toRoundString = zeroesToAddInDecimalPlaces.join("") + toRoundString;
  }
/*adds zeroes to the end of the float if you are rounding to a decimal places
 larger than the decimal places already there
 ex toFixed(1.2,3) => 1.200*/
  while(toRoundString.length < precision){
    toRoundString+="0";
  }
  return wholeNumberDigits + "." + toRoundString;
}
