// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import {
  window,
  ExtensionContext,
  Uri,
  FileDecoration,
  FileDecorationProvider,
  ThemeColor,
} from 'vscode';
import map from 'iter-tools-es/methods/map';
import flatMap from 'iter-tools-es/methods/flat-map';

import { accessors } from 'macrome';
import { extname } from 'path';

const accessorsByFileType = new Map(
  // we do not yet have types for which more than one accessor may be valid
  flatMap((axr) => map((type) => [type, axr], axr.supportedFileTypes), accessors),
);

export class MacromeDecorationProvider implements FileDecorationProvider {
  private static decoration: FileDecoration = {
    color: new ThemeColor('gitDecoration.ignoredResourceForeground'),
  };

  async provideFileDecoration(uri: Uri): Promise<FileDecoration | undefined> {
    const accessor = accessorsByFileType.get(extname(uri.fsPath).slice(1));
    if (accessor) {
      const annotations = await accessor.readAnnotations(uri.fsPath);
      if (annotations) {
        return MacromeDecorationProvider.decoration;
      }
    }
  }
}

export function activate(context: ExtensionContext) {
  const decorationProvider = new MacromeDecorationProvider();
  context.subscriptions.push(window.registerFileDecorationProvider(decorationProvider));
}

export function deactivate() {}
