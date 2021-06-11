import React from 'react';
// import { createPortal } from 'react-dom';

/**
 * TODO;
 * isolating with iframes tend to isolate too much, styles are hard to pass down and other problems arise.
 * For now this component is purely structural and does not actually isolate anything.
 */
const IsolateStyles: React.FC<React.HTMLProps<HTMLIFrameElement>> = ({ children, ...props }) => {
  // const contentRef = React.useRef<HTMLIFrameElement>(null);

  // const mountNode = contentRef?.current?.contentWindow?.document?.body as HTMLElement;
  // const [ready, setReady] = React.useState(false);

  // React.useEffect(() => {
  //   console.log('second render', mountNode, contentRef);
  //   setReady(true);
  // }, []);

  // return (
  //   <iframe {...props} ref={contentRef} frameBorder="0">
  //     {Boolean(ready && mountNode) && createPortal(children, mountNode)}
  //   </iframe>
  // );
  return <div {...props}>{children}</div>;
};

export default IsolateStyles;
