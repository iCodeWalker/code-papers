import React, {useRef, useEffect} from 'react';

import './preview.css';

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id='root'></div>
    <script>
      const handleErr = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      }
      <!-- Handling async error here, using 'error' eventListener -->  
      window.addEventListener('error',(event) => {
        event.preventDefault();
        handleErr(event.error);
      })

      window.addEventListener('message', (event) => {
        try{
          eval(event.data);
        }catch(err){
          handleErr(err);
        }
      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({code, err}) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 100);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
        title="preview"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
