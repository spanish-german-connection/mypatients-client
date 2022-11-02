import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
const toolbarOptions = [
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  ["bold", "italic", "underline"], // toggled buttons
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  // ["clean"],
];
const modules = {
  toolbar: toolbarOptions,
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "indent",
];

function TextEditor({ value, onChange, placeholder }) {
  return (
    <>
      <div className="text-editor">
        <ReactQuill
          theme="snow"
          value={value || ""}
          modules={modules}
          formats={formats}
          onChange={onChange}
          placeholder={placeholder}
          className="align-left"
        />
      </div>
    </>
  );
}

export default TextEditor;
