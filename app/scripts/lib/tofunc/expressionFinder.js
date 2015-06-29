function ExpressionFinder (tokenOpen,tokenClose) {
	
	this.tokenOpen = tokenOpen || "{{";
	this.tokenClose = tokenClose || "}}";
	this.expr = "";

	this.pattern = new RegExp(this.EscapeCharacter(this.tokenOpen)+".*?"+this.EscapeCharacter(this.tokenClose),"g");
}

ExpressionFinder.prototype.EscapeCharacter = function(tokens) {
    var escaped = "";

    for (var i = 0; i < tokens.length; i++) {
        escaped += "\\" + tokens[i];
    }

    return escaped;
};

ExpressionFinder.prototype.GetOpenToken = function() {
	return this.tokenOpen;
};

ExpressionFinder.prototype.GetCloseToken = function() {
    return this.tokenClose;
};

ExpressionFinder.prototype.Parse = function(expr) {
	if(typeof expr != 'string')
		throw "expr argument must be a string";

	var result = expr.match(this.pattern);
 
	if (result == null || typeof (expr) == 'undefined') {
	    return expr;
	}

	//strip open and close tokens
	for (var i = result.length - 1; i >= 0; i--) {
		result[i] = result[i].replace(this.tokenOpen,"").replace(this.tokenClose,"");
	};

	return result;
};

