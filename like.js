function site1_1(str) {
    return str.split("").reverse().join("");
}
console.log(site1_1("site1_1"))

function site1_2(str) {
    // Step 1. Create an empty string that will host the new created string
    var newString = "";

    // Step 2. Create the FOR loop
    /* The starting point of the loop will be (str.length - 1) which corresponds to the
       last character of the string, "o"
       As long as i is greater than or equals 0, the loop will go on
       We decrement i after each iteration */
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i]; // or newString = newString + str[i];
    }
    /* Here hello's length equals 5
        For each iteration: i = str.length - 1 and newString = newString + str[i]
        First iteration:    i = 5 - 1 = 4,         newString = "" + "o" = "o"
        Second iteration:   i = 4 - 1 = 3,         newString = "o" + "l" = "ol"
        Third iteration:    i = 3 - 1 = 2,         newString = "ol" + "l" = "oll"
        Fourth iteration:   i = 2 - 1 = 1,         newString = "oll" + "e" = "olle"
        Fifth iteration:    i = 1 - 1 = 0,         newString = "olle" + "h" = "olleh"
    End of the FOR Loop*/

    // Step 3. Return the reversed string
    return newString; // "olleh"
}
console.log(site1_2("pipa"))

function site1_3(str) {
  if (str === "") // This is the terminal case that will end the recursion
    return ""
  else
    return site1_3(str.substr(1)) + str.charAt(0);
}
console.log(site1_3("ya ne znaiu jabu skrypt"))

function site2_1(s){
    return [...s].reverse().join("");
}
console.log(site2_1("cola"))

function reverse1(s) {
  var o = "";
  for (var i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o;
}
console.log(reverse1("nasho"))

function reverse2(s) {
  var o = [];
  for (var i = s.length - 1, j = 0; i >= 0; i--, j++)
    o[j] = s[i];
  return o.join('');
}
console.log(reverse2("ja"))

function reverse3(s) {
  var o = [];
  for (var i = 0, len = s.length; i <= len; i++)
    o.push(s.charAt(len - i));
  return o.join('');
}
console.log(reverse3("tsym"))

function reverse4(s) {
  var i = s.length,
      o = '';
  while (i > 0) {
    o += s.substring(i - 1, i);
    i--;
  }
  return o;
}
console.log(reverse4("shcho"))

function reverse5(s) {
  for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
  return o;
}
console.log(reverse5("ne"))

function reverse6(s) {
  return (s === '') ? '' : reverse6(s.substr(1)) + s.charAt(0);
}
console.log(reverse6("tak"))

function reverse7(s) {
  function rev(s, len, o) {
    return (len === 0) ? o : rev(s, --len, (o += s[len]));
  };
  return rev(s, s.length, '');
}
console.log(reverse7("ja"))

function reverse8(s) {
  s = s.split('');
  var len = s.length,
      halfIndex = Math.floor(len / 2) - 1,
      tmp;


     for (var i = 0; i <= halfIndex; i++) {
        tmp = s[len - i - 1];
        s[len - i - 1] = s[i];
        s[i] = tmp;
      }
      return s.join('');
    }
console.log(reverse8("zrobyv"))

function reverse9(s) {
  if (s.length < 2)
    return s;
  var halfIndex = Math.ceil(s.length / 2);
  return reverse9(s.substr(halfIndex)) +
         reverse9(s.substr(0, halfIndex));
}
console.log(reverse9("v zhytti"))


