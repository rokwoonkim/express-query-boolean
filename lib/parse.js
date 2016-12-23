'use strict';

/**
 * Attempts to recursively convert object properties to dates.
 * @param  {Object}  obj  - Object to iterate over
 * @return {Object}  Returns new object (shallow copy).
*/
function parse(obj) {
  var result = {},
      key,
      value;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];

      if (typeof value === 'string') {
        if (value === 'true') {
          result[key] = true;
        }
        else if (value === 'false') {
          result[key] = false;
        }
        else {
          result[key] = value;
        }
      }
      else if (Array.isArray(value)) {
        var _newArray = [];
        for (var i = 0; i < value.length; i++) {
          var subValue = value[i];
          if (typeof subValue === 'string') {
            if (subValue === 'true') {
              _newArray[i] = true;
            }
            else if (subValue === 'false') {
              _newArray[i] = false;
            }
            else {
              _newArray[i] = subValue;
            }
          } else {
            _newArray[i] = parse(subValue);
          }
        }
        result[key] = _newArray;
      }
      else if (value.constructor === Object) {
        result[key] = parse(value);
      }
      else {
        result[key] = value;
      }
    }
  }

  return result;
}

module.exports = parse;
