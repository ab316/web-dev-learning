import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Quill, { TextChangeHandler } from "quill";
import Delta from "quill-delta";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS: any = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState<Socket>();
  const [quill, setQuill] = useState<Quill>();

  // Create Editor
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.innerHTML = "";
      const editor = document.createElement("div");
      wrapperRef.current.append(editor);

      const q = new Quill(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      q.disable();
      q.setText("Loading...");
      setQuill(q);
    }
  }, [wrapperRef]);

  // Connect socket
  useEffect(() => {
    console.log("Connecting to server");
    const s = io("http://localhost:3001");
    setSocket(s);
    console.log("Connected");

    // Cleanup function. React calls it when it is time to clean up
    // React calls the useEffect after the component mounts and after every render
    /// (if [] is provided as the second argument, then only after the component mounts).
    // React calls the cleanup fucntion when the component unmounts and cleanup from the previous render (when React has to render again)
    return () => {
      s.disconnect();
      console.log("Disconnected socket");
    };
  }, []);

  // Load Document
  useEffect(() => {
    if (!quill || !socket || !documentId) return;

    socket.once("load-document", (document) => {
      console.log("Document loaded", document);
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  // Save Document
  useEffect(() => {
    if (!quill || !socket || !documentId) return;
    const interval = setInterval(() => {
      console.log("Saving", socket.connected);
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => clearInterval(interval);
  }, [socket, quill, documentId]);

  // Send change
  useEffect(() => {
    if (!quill || !socket) return;

    const handler: TextChangeHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      console.log("send-changes", delta, oldDelta);
      socket.emit("send-changes", delta);
    };

    console.log("Adding quill text-change listener");
    quill.on("text-change", handler);

    return () => {
      console.log("Removing quill text-change listener");
      quill.off("text-change", handler);
    };
  }, [quill, socket]);

  // Receive change
  useEffect(() => {
    if (!quill || !socket) return;

    const handler = (delta: Delta) => {
      console.log("receive-changes", delta);
      quill.updateContents(delta);
    };

    console.log("Adding socket receive-changes listener");
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes");
    };
  }, [quill, socket]);

  return <div className="container" ref={wrapperRef}></div>;
};

export default TextEditor;
