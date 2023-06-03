import React, { useRef, useEffect } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop];
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const newX = e.clientX - canvas.offsetLeft;
      const newY = e.clientY - canvas.offsetTop;

      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(newX, newY);
      context.stroke();

      [lastX, lastY] = [newX, newY];
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
    };
  }, []);

  const saveWhiteboard = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();

    fetch('/api/whiteboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Image sent successfully!', data);
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      <button onClick={saveWhiteboard}>Save Whiteboard</button>
    </div>
  );
};

export default Whiteboard;
