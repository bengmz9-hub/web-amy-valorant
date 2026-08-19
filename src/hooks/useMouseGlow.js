import { useEffect } from 'react';

export function useMouseGlow() {
  useEffect(() => {
    let flashlight = document.querySelector('.tactical-flashlight');
    if (!flashlight) {
      flashlight = document.createElement('div');
      flashlight.className = 'tactical-flashlight';
      document.body.appendChild(flashlight);
    }

    let mouseMoveRequest = null;
    let mouseX = 0;
    let mouseY = 0;

    function updateMousePositions() {
      document.body.style.setProperty('--mouse-x', mouseX + 'px');
      document.body.style.setProperty('--mouse-y', mouseY + 'px');
      if (flashlight) {
        flashlight.style.left = mouseX + 'px';
        flashlight.style.top = mouseY + 'px';
      }
      mouseMoveRequest = null;
    }

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!mouseMoveRequest) {
        mouseMoveRequest = requestAnimationFrame(updateMousePositions);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (mouseMoveRequest) cancelAnimationFrame(mouseMoveRequest);
      if (flashlight && flashlight.parentNode) {
        flashlight.parentNode.removeChild(flashlight);
      }
    };
  }, []);
}
