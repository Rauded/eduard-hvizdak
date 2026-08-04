import { useEffect } from 'react';

// Freeze the page behind an open overlay.
//
// `document.body.style.overflow = 'hidden'` is the obvious version and it does
// not work here. The scrolling element on this site is <html>, not <body>, so
// hiding body's overflow leaves the page scrolling behind the panel. iOS Safari
// ignores overflow:hidden for touch scrolling regardless of which element
// carries it.
//
// So: pin the body at its current offset with position:fixed (the same
// technique the mobile menu in header.tsx uses), and pay back the scrollbar
// width as padding so the layout does not jump sideways when the scrollbar
// disappears.
//
// Scroll chaining is a separate problem and is handled in CSS: the scrollable
// panel needs `overscroll-behavior: contain`, or a wheel that reaches the
// panel's end keeps going into the page underneath.
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return undefined;

    const { body } = document;
    const y = window.scrollY;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.paddingRight = prev.paddingRight;
      body.style.overflow = prev.overflow;
      // position:fixed threw the scroll position away; put it back.
      window.scrollTo(0, y);
    };
  }, [locked]);
}

export default useScrollLock;
