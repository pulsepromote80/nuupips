"use client";

import React, { useState, useEffect, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

// Important: formats array mein bullet include karein
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "indent",
  "align",
  "link",
  "image",
  "video",
];

export default function QuillEditor({
  value = "",
  onChange = () => {},
  placeholder = "Write something...",
  readOnly = false,
  height = 200,
  className = "",
}) {
  const [editorValue, setEditorValue] = useState(value);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  // Agar component mount nahi hua hai to loading show karein
  if (!isMounted) {
    return <div style={{ height: height }} className="bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />;
  }

  return (
    <div className={`quill-wrapper ${className}`}>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{
          height: height,
        }}
      />
      <style jsx>{`
        :global(.quill-wrapper .ql-toolbar) {
          border-radius: 8px 8px 0 0;
          border-color: #e5e7eb;
          background-color: #f9fafb;
        }
        :global(.dark .quill-wrapper .ql-toolbar) {
          border-color: #374151;
          background-color: #1f2937;
        }
        :global(.quill-wrapper .ql-container) {
          border-radius: 0 0 8px 8px;
          border-color: #e5e7eb;
          font-size: 16px;
          min-height: ${height - 50}px;
        }
        :global(.dark .quill-wrapper .ql-container) {
          border-color: #374151;
          background-color: #111827;
        }
        :global(.quill-wrapper .ql-editor) {
          min-height: ${height - 50}px;
        }
        :global(.quill-wrapper .ql-editor.ql-blank::before) {
          color: #9ca3af;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}

export { modules, formats };