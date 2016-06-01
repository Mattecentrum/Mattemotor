angular.module('templates-main', ['../app/views/templates/et-button.html', '../app/views/templates/et-dropdown.html', '../app/views/templates/et-field.html', '../app/views/templates/et-multifield.html', '../app/views/templates/et-sequence.html']);

angular.module("../app/views/templates/et-button.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/templates/et-button.html",
    "<div class=\"center\">\n" +
    "    <div data-ng-repeat=\"(name,item) in items\">\n" +
    "        <div data-ng-repeat=\"option in item.options track by $index\" class=\"cols clearfix\">\n" +
    "            <span></span>\n" +
    "            <button type=\"button\" data-ng-click=\"SetAnswerForButton(name, option)\" data-ng-class=\"GetClassesForButton(name, option)\" class=\"button gray\" compile=\"option\">{{ option }} </button>\n" +
    "            <span></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("../app/views/templates/et-dropdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/templates/et-dropdown.html",
    "<div class=\"center\">\n" +
    "    <div>\n" +
    "        <label class=\"cols clearfix\" ng-repeat=\"(name,item) in items\" data-ng-class=\"GetAnswerClass(name)\">\n" +
    "\n" +
    "        <span>{{item.question}}</span>\n" +
    "            <select ng-focus=\"ResetField(name)\" ng-model=\"answer[name].Answer\" ng-class=\"GetAnswerClass(name)\" >\n" +
    "            <option ng-repeat=\"option in item.options track by $index\">{{option}}</option>\n" +
    "            <select>\n" +
    "            <span></span>\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("../app/views/templates/et-field.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/templates/et-field.html",
    "<div class=\"center\">\n" +
    "    <div>\n" +
    "        <label data-ng-repeat=\"(name,value) in items\" class=\"cols clearfix\">\n" +
    "            <span ng-bind=\"evaluateExpression(name)\"></span>\n" +
    "\n" +
    "            <input type=\"text\" data-ng-keydown=\"$parent.$parent.keypressCallback($event)\" data-ng-focus=\"ResetField(name)\" data-ng-click=\"ResetField(name)\" id=\"input{{name}}\" data-ng-model=\"answer[name].Answer\" data-ng-class=\"GetAnswerClass(name)\" ontouchstart=\"this.type='number'\" onfocus=\"changeType(this)\">\n" +
    "            <span>{{ exercise.answerformat }}</span>\n" +
    "        </label>\n" +
    "    </div>\n" +
    " </div>");
}]);

angular.module("../app/views/templates/et-multifield.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/templates/et-multifield.html",
    "<div class=\"center\" math-jax>\n" +
    "    <div class=\"cols func clearfix\">\n" +
    "        <div ng-repeat=\"token in tokens\">\n" +
    "            <div data-ng-switch on=\"items[token]\">\n" +
    "                <span class=\"multifield\" data-ng-switch-when=\"undefined\" >\n" +
    "                    {{token}}\n" +
    "                </span>\n" +
    "                \n" +
    "                <input class=\"multifield\" data-ng-switch-default type=\"text\" ng-model=\"answer[token].Answer\" \n" +
    "                    ng-class=\"GetAnswerClass(token)\" \n" +
    "                    ng-focus=\"ResetField(token)\" \n" +
    "                    ng-keydown=\"$parent.keypressCallback($event,$parent.answer[token])\" \n" +
    "                />\n" +
    "             </div>\n" +
    "        </div>\n" +
    "     </div>\n" +
    "</div>");
}]);

angular.module("../app/views/templates/et-sequence.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/views/templates/et-sequence.html",
    "<div class=\"center\">\n" +
    "    <div data-ng-repeat=\"(name, item) in items\">\n" +
    "        <ul  data-as-sortable=\"dragControlListeners\" data-ng-model=\"item.options\">\n" +
    "            <li data-ng-repeat=\"option in item.options\" style=\"text-align: center;\" data-as-sortable-item>\n" +
    "                <div data-as-sortable-item-handle class=\"gray button\" data-ng-class=\"GetClassesForButton(name, option)\">\n" +
    "                    <span compile=\"option\" style=\"text-align: center;\" data-ng-bind=\"option\"></span> \n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);
