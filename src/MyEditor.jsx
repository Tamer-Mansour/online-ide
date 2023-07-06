import React, { useEffect, useRef } from 'react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

const MyEditor = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = monacoEditor.editor.create(editorRef.current, {
            value: 'console.log("Hello, world!");',
            language: 'javascript',
        });

        // Define and set the custom theme
        monacoEditor.editor.defineTheme('myCustomTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [{ token: 'keyword', foreground: 'FF0000' }],
            colors: {},
        });

        monacoEditor.editor.setTheme('myCustomTheme');

        // Cleanup function to dispose the editor when the component unmounts
        return () => {
            editor.dispose();
        };
    }, []);

    return <div ref={editorRef} style={{ width: '800px', height: '600px' }}></div>;
};

export default MyEditor;
