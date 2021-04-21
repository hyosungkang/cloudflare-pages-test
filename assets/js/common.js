
function dateFormat(unixDate)
{
    return moment.unix(unixDate).format('D MMM YYYY HH:mm') + ' NZST';
}

function dateToUnix(strDate)
{
    var str = strDate;
    var word = 'NZST';
    var newWord = 'GMT+1200';
    // find the index of last time word was used
    // please note lastIndexOf() is case sensitive
    var n = str.lastIndexOf(word);
    // slice the string in 2, one from the start to the lastIndexOf
    // and then replace the word in the rest
    str = str.slice(0, n) + str.slice(n).replace(word, newWord);
    return Date.parse(str);
}

// Returns true if a value is an object
function isObject (value)
{
    return value && typeof value === 'object';
};