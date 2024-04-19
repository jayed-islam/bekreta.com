import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
// import './'

interface MyEditorComponentProps {
  placeholder: string;
  onEditorChange: (html: string) => void;
}

interface MyEditorComponentState {
  editorHtml: string;
  theme: string;
}

// Import the Quill editor dynamically to avoid server-side rendering issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

class MyEditorComponent extends React.Component<
  MyEditorComponentProps,
  MyEditorComponentState
> {
  static modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  static formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    onEditorChange: PropTypes.func.isRequired,
  };

  constructor(props: MyEditorComponentProps) {
    super(props);
    this.state = { editorHtml: "", theme: "snow" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html: string) {
    this.setState({ editorHtml: html });
    this.props.onEditorChange(html);
  }

  handleThemeChange(newTheme: string) {
    if (newTheme === "core") newTheme = "snow";
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <div className="w-full">
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={MyEditorComponent.modules}
          formats={MyEditorComponent.formats}
          bounds={".app"}
          className="h-56 lg:w-[46.5rem] rounded-3xl"
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default MyEditorComponent;
