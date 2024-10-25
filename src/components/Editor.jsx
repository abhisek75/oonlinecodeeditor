import React from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';

function Editor({
  theme = 'vs-light',
  language,
  value,
  handleEditorChange
}) {
  return (
    <div>
      <MonacoEditor
        theme={theme}
        width='100%'
        height='90vh'
        defaultLanguage={language}
        value={value}
        onChange={(value) => handleEditorChange(value)}
        className='rounded-lg shadow-md'
        options={{
        fontSize: 18,
      }}
      /> 
    </div>

  );
}

export default Editor;
