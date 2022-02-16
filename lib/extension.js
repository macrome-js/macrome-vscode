"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.MacromeDecorationProvider = void 0;
const vscode_1 = require("vscode");
const map_1 = __importDefault(require("iter-tools-es/methods/map"));
const flat_map_1 = __importDefault(require("iter-tools-es/methods/flat-map"));
const macrome_1 = require("macrome");
const path_1 = require("path");
const accessorsByFileType = new Map(
// we do not yet have types for which more than one accessor may be valid
(0, flat_map_1.default)((axr) => (0, map_1.default)((type) => [type, axr], axr.supportedFileTypes), macrome_1.accessors));
class MacromeDecorationProvider {
    async provideFileDecoration(uri) {
        const accessor = accessorsByFileType.get((0, path_1.extname)(uri.fsPath).slice(1));
        if (accessor) {
            const annotations = await accessor.readAnnotations(uri.fsPath);
            if (annotations) {
                return MacromeDecorationProvider.decoration;
            }
        }
    }
}
exports.MacromeDecorationProvider = MacromeDecorationProvider;
MacromeDecorationProvider.decoration = {
    color: new vscode_1.ThemeColor('gitDecoration.ignoredResourceForeground'),
};
function activate(context) {
    const decorationProvider = new MacromeDecorationProvider();
    context.subscriptions.push(vscode_1.window.registerFileDecorationProvider(decorationProvider));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
