import { ExtensionContext, Uri, FileDecoration, FileDecorationProvider } from 'vscode';
export declare class MacromeDecorationProvider implements FileDecorationProvider {
    private static decoration;
    provideFileDecoration(uri: Uri): Promise<FileDecoration | undefined>;
}
export declare function activate(context: ExtensionContext): void;
export declare function deactivate(): void;
