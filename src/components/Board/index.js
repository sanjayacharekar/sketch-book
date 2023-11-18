import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Board = () => {
  const canvasRef = useRef(null);
  const shouldRef = useRef(null);

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  // before browser paint
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //when mounting
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x,y)=>{
      context.beginPath()
      context.moveTo(x,y)
    }
    const drawLine = (x,y)=>{
      context.lineTo(x,y)
      context.stroke()
    }
    const handleMouseDown = (e) => {
      shouldRef.current = true;
      beginPath(e.clientX, e.clientY);
    };
    const handleMouseUp = (e) => {
      shouldRef.current = false;
    };
    const handleMouseMove = (e) => {
      if (!shouldRef.current) return;
      drawLine(e.clientX, e.clientY)
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig();
  }, [color, size]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
