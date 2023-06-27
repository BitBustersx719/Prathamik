import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Canvas = ({ canvasRef, color, setElements, elements, tool }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 2;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const draw = (e) => {
      if (!isDrawing) return;

      if (tool === "eraser") {
        context.strokeStyle = "white";
      } else {
        context.strokeStyle = color;
      }

      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();

      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          color: tool === "eraser" ? "white" : color,
          from: { x: lastX, y: lastY },
          to: { x: e.offsetX, y: e.offsetY },
        },
      ]);

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const startDrawing = (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [canvasRef, color, setElements, tool]);

  const renderToolIcon = () => {
    switch (tool) {
      case "pencil":
        return <FontAwesomeIcon icon={faPencilAlt} />;
      case "line":
        // Add the icon for the line tool
        return <span>Line Icon</span>;
      case "rect":
        // Add the icon for the rectangle tool
        return <span>Rectangle Icon</span>;
      case "eraser":
        // Add the icon for the eraser tool
        return <span>Eraser Icon</span>;
      default:
        return null;
    }
  };

  return (
    <div className="col-md-12 text-center">
      <div className="tool-icon">{renderToolIcon()}</div>
      <canvas ref={canvasRef} width="800" height="600"></canvas>
    </div>
  );
};

export default Canvas;
