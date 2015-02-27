module.exports =  function (arr) {
var Table = require('cli-table');
var table = new Table({ head: ["", "Path"] });

for (var i = 0, l = arr.length; i < l; i++) { 
  var baseUrl = arr[i][0], stack = arr[i][1];
  if (stack && stack[0]) {
    for (var j = 0; j < stack[0].route.stack.length; j++) {
        var method = stack[0].route.stack[j].method;
        var _o = {};
        _o[method] = [baseUrl + stack[0].route.path];
        table.push(_o)
    }
  }
}

console.log(table.toString());
return table;
};
