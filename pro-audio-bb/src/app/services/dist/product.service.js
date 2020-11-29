"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.url = environment_1.environment.serverURL;
    }
    ProductService.prototype.getAllProducts = function (numberOfResults) {
        if (numberOfResults === void 0) { numberOfResults = 2; }
        return this.http.get(this.url + 'products', {
            params: {
                limit: numberOfResults.toString()
            }
        });
    };
    ProductService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
