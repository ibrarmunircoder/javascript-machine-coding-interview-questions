import React, { useEffect, useState } from "react";

type CircleType = "left" | "right";

type Circle = {
  id: CircleType;
  width: number;
  height: number;
  startX: number;
  startY: number;
  backgroundColor: string;
  x: number;
  y: number;
};

function elementsOverlap(leftCircle: Circle, rightCircle: Circle) {
  const leftCircleRadius = leftCircle.width / 2;
  const rightCircleRadius = rightCircle.width / 2;

  const leftCenter = {
    x: leftCircle.x + leftCircleRadius,
    y: leftCircle.y + leftCircleRadius,
  };

  const rightCenter = {
    x: rightCircle.x + rightCircleRadius,
    y: rightCircle.y + rightCircleRadius,
  };

  const distanceBetweenCenters = Math.sqrt(
    Math.pow(leftCenter.x - rightCenter.x, 2) +
      Math.pow(leftCenter.y - rightCenter.y, 2)
  );

  return distanceBetweenCenters < leftCircleRadius + rightCircleRadius;
}

export const Circles = () => {
  const [currentCircleId, setCurrentCircleId] = useState<string | null>(null);
  const [circles, setCircles] = useState<Circle[]>([
    {
      id: "left",
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: "red",
    },
    {
      id: "right",
      width: 0,
      height: 0,
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      backgroundColor: "red",
    },
  ]);
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { buttons } = event;
    const currentId = buttons === 1 ? "left" : "right";

    setCurrentCircleId(currentId);

    setCircles((prev) => {
      return prev.map((circle) => {
        if (circle.id === currentId) {
          return {
            ...circle,
            startX: event.clientX,
            startY: event.clientY,
            // resetting the circle if user clicks on the board again
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          };
        }

        return circle;
      });
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (currentCircleId === null) {
      return;
    }

    const updatedCircles = circles.map((circle) => {
      if (currentCircleId === circle.id) {
        const distanceX = event.clientX - circle.startX;
        const distanceY = event.clientY - circle.startY;

        const size = Math.max(Math.abs(distanceX), Math.abs(distanceY));

        const newX = distanceX < 0 ? circle.startX - size : circle.startX;
        const newY = distanceY < 0 ? circle.startY - size : circle.startY;

        return {
          ...circle,
          width: size,
          height: size,
          x: newX,
          y: newY,
        };
      }

      return circle;
    });
    const doCirclesOverlap = elementsOverlap(
      updatedCircles[0],
      updatedCircles[1]
    );

    const newCircles = updatedCircles.map((circle) => {
      if (circle.id === currentCircleId) {
        return {
          ...circle,
          backgroundColor: doCirclesOverlap ? "blue" : "red",
        };
      }

      return circle;
    });

    setCircles(newCircles);
  };

  const handleMouseUp = () => {
    setCurrentCircleId(null);
  };

  return (
    <div
      className="board"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {circles.map((circle) => (
        <div
          key={circle.id}
          style={{
            position: "absolute",
            width: `${circle.width}px`,
            height: `${circle.height}px`,
            top: `${circle.y}px`,
            left: `${circle.x}px`,
            backgroundColor: circle.backgroundColor,
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};
