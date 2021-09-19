import type { WebviewTag } from "electron";
import { useLayoutEffect, useState } from "react";

type BrowserTabProps = {
  src: string;
  webViewRef: React.RefObject<WebviewTag>;
  bottomMargin?: number;
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const BrowserTab = ({ src, bottomMargin, webViewRef }: BrowserTabProps) => {
  const [_width, height] = useWindowSize();

  return (
    <webview
      ref={webViewRef}
      style={{
        width: '100%',
        height: height - (bottomMargin || 0),
        display: 'inline-flex',
      }}
      src={src}
    />
  );
};

export default BrowserTab;
