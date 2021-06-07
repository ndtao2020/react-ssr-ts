"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var home_1 = require("../../shared/pages/home");
var id = document.getElementById("root");
react_dom_1.hydrate(<home_1["default"] {...window.__DATA__}/>, id);
if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("@/shared/pages/home", function () {
        return Promise.resolve().then(function () { return require("../../shared/pages/home"); }).then(function (e) {
            return react_dom_1.hydrate(<e["default"] {...window.__DATA__}/>, id);
        });
    });
}
