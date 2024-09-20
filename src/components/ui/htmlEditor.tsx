// ort React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the editor
import { FormLabel } from './form';

// Dynamically import ReactQuill to ensure it only loads on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const HtmlEditor = ({ value, onChange }: any) => {
    const modules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['raw']                                         
      ],
    };
  
    const formats = [
      'header',
      'font',
      'list',
      'bullet',
      'bold',
      'italic',
      'underline',
      'color',
      'background',
      'align',
      'link',
      'image',
      'video',
    ];
  
    return (
      <div>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          theme="snow"
        />
        <br />
        <FormLabel>Preview Description:</FormLabel>
        <div className="ql-editor" dangerouslySetInnerHTML={{__html: value}} />
        </div>
    );
  };
  

export default HtmlEditor;