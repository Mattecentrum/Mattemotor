function ToFunc(options) {
    var defaultOptions = {
        openToken: "{{",
        closeToken: "}}"
    };

    var options = options || defaultOptions;

    if (!options.openToken)
        throw "Must declare openToken";

    if (!options.closeToken)
        throw "Must declare closeToken";

    this.replacer = new Replacer();
    this.expressionFinder = new ExpressionFinder(options.openToken, options.closeToken);
    this.stringExpressionFinder = new ExpressionFinder("'", "'");
}

ToFunc.prototype.Parse = function (expression, scope) {    
    var evaluated = {},
        expressionCopy = expression,
        result = this.expressionFinder.Parse(expression);

    if(typeof(expressionCopy) === 'string') {
        expressionCopy = expressionCopy.replace(/'/g, "&#39;");
    }

    for (var i = 0; i < result.length; i++) {
        var tmp = result[i];
        
        if (scope) tmp = this.replacer.Parse(scope, result[i]);


        if(typeof(result[i]) === 'string') {
            result[i] = result[i].replace(/'/g, "&#39;");
        }

        var stringsInExpression = this.stringExpressionFinder.Parse(tmp);

        if (typeof(tmp) === 'string' && tmp.indexOf("'") != -1) {
            for (var index in stringsInExpression) {
                if (stringsInExpression[index] == '') continue;
                tmp = tmp.replace(stringsInExpression[index], "|" + index + "|");
            }
        }

        var tmpMath = tmp;
        
        if(typeof(tmp) === 'string') {
            tmpMath = this.GetFunc(tmp);
        }
        
        if (typeof(tmp) === 'string' && tmp.indexOf("'") != -1) {
            for (var index2 in stringsInExpression) {
                if (stringsInExpression[index2] == '') continue;
                tmpMath = tmpMath.replace("|" + index2 + "|", stringsInExpression[index2]);
            }
        }
     
        evaluated[result[i]] = tmpMath;

        if(typeof(expressionCopy) === 'string' && expressionCopy.indexOf(this.expressionFinder.GetOpenToken()) != -1) {
            expressionCopy = expressionCopy.replace(this.expressionFinder.GetOpenToken() + result[i] + this.expressionFinder.GetCloseToken(), '\'+ (typeof(' + evaluated[result[i]] + ') == \'number\' ? (Math.round((' + evaluated[result[i]] + ')* 100) / 100).toString().replace(".",",") : ' + evaluated[result[i]] + ') +\'');
        }
    }
    expression = "return \'" + expressionCopy + "\'";
    return expression.toString();
};

ToFunc.prototype.GetFunc = function (str) {
    /*

    We have a pontentional hard to solve bug here where mathjs converts programaticall expression to math ! == factorial etc;
*/
    if (str.indexOf("!") != -1) {
        return str;
    }

    return mathjs(str);
};