import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your server URL

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(10);
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");

  useEffect(() => {
    socket.on("initialElements", (initialElements) => {
      setElements(initialElements);
    });

    socket.on("updateElements", (updatedElements) => {
      setElements(updatedElements);
    });
    return () => {
      socket.off("initialElements");
      socket.off("updateElements");
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  const handleToolChange = (e) => {
    const selectedTool = e.target.value;
    setTool(selectedTool);

    if (selectedTool === "eraser") {
      setColor("#FFFFFF");
    } else {
      setColor("#000000");
    }
  };

  const handleElementsUpdate = (updatedElements) => {
    socket.emit("updateElements", updatedElements);
  };

  const drawRectangle = () => {
    setTool("rectangle");
  };

  const drawLine = () => {
    setTool("line");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="display-5 pt-4 pb-3 text-center">Whiteboard</h1>
      </div>
      <div className="row justify-content-center align-items-center text-center py-2">
        <div className="col-md-2">
          <div className="color-picker d-flex align-items-center justify-content-center">
            Color Picker : &nbsp;
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="pencil"
              value="pencil"
              checked={tool === "pencil"}
              onChange={handleToolChange}
            />
            <label className="form-check-label" htmlFor="pencil">
              Pencil
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="eraser"
              value="eraser"
              checked={tool === "eraser"}
              onChange={handleToolChange}
            />
            <label className="form-check-label" htmlFor="eraser">
              Eraser
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="rectangle"
              value="rectangle"
              checked={tool === "rectangle"}
              onChange={handleToolChange}
            />
            <label className="form-check-label" htmlFor="rectangle">
              Rectangle
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="tools"
              id="line"
              value="line"
              checked={tool === "line"}
              onChange={handleToolChange}
            />
            <label className="form-check-label" htmlFor="line">
              Line
            </label>
          </div>
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={elements.length === 0}
            onClick={() => undo()}
          >
            Undo
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-outline-primary ml-1"
            disabled={history.length < 1}
            onClick={() => redo()}
          >
            Redo
          </button>
        </div>
        <div className="col-md-1">
          <div className="color-picker d-flex align-items-center justify-content-center">
            <input
              type="button"
              className="btn btn-danger"
              value="Clear Canvas"
              onClick={clearCanvas}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="penSize">Pencil Size:</label>
            <input
              type="range"
              id="penSize"
              min="1"
              max="20"
              value={penSize}
              onChange={(e) => setPenSize(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="eraserSize">Eraser Size:</label>
            <input
              type="range"
              id="eraserSize"
              min="1"
              max="30"
              value={eraserSize}
              onChange={(e) => setEraserSize(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          penSize={penSize}
          eraserSize={eraserSize}
          setElements={handleElementsUpdate}
          elements={elements}
          tool={tool}
        />
      </div>
    </div>
  );
};
export default Whiteboard;
