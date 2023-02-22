import {Provider} from 'react-redux';
import {store} from './state';

// import CodeEditor from './components/code-editor';
// import Preview from './components/preview';
// import {Bundler} from './bundler';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';

const App = () => {
  // const [input, setInput] = useState<string>('');
  // const [codeOutput, setCodeOutput] = useState<string>('');

  // const onSubmitCode = async () => {
  //   //----- This transform function is used for tanspiling the jsx code into simple js ------

  //   // const result = await ref.current.transform(input, {
  //   //   loader: "jsx",
  //   //   target: "es2015",
  //   // });

  //   const bundledCode = await Bundler(input);

  //   setCodeOutput(bundledCode); // Our transpiled and bundled code

  //   // iframeRef.current.contentWindow.postMessage(
  //   //   result.outputFiles[0].text,
  //   //   '*',
  //   // ); // sending our bundled code using message service in iframes
  // };

  // ------- sending input code to iframe using script tag. ---------
  //   const html = `
  //   <script>
  //   ${codeOutput}
  //   </script>
  // `;

  // ------- sending input code to iframe using event listener (message). ---------
  //   const html = `
  //   <html>
  //     <head></head>
  //     <body>
  //       <div id='root'></div>
  //       <script>
  //         window.addEventListener('message', (event) => {
  //           try{
  //             eval(event.data);
  //           }catch(err){
  //             const root = document.querySelector('#root');
  //             root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>';
  //             console.error(err);
  //           }
  //         }, false)
  //       </script>
  //     </body>
  //   </html>
  // `;

  return (
    <Provider store={store}>
      <div>
        <CellList />
        {/* <CodeCell /> */}

        {/* <div style={{textAlign: 'center', margin: 16}}>
        <CodeEditor
          initialValue="const a = 1;"
          onChange={value => setInput(value)}
        />
      </div> */}

        {/* <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div> */}
        {/* <div>
        <pre style={{color: '#fff', marginLeft: '5rem'}}>{codeOutput}</pre>
      </div> */}

        {/* iframe is used to embed or show one html document into another */}
        {/* iframes have different javascript execution context than its parent (in this index.html) */}
        {/* 
        ------------ When direct access is allowed between frames -------------
        To allow child access parent : we can use "parent.variable_name" in child 
        To allow parent access child : we can use document.querySelector('iframe').contentWindow.variable_name
      */}

        {/* 
      ------------------- To continue direct access between frames ----------------

      1. iframe element should not have sandbox property on it or should have sandbox='allow-same-origin'
      2. If we fetch parent html document and frame html document from the same source.
          Domain, Port, protocol
      */}

        {/* <iframe sandbox="" src="http://localhost:3000/test.html" /> */}

        {/* For accessing iframe document html locally without any network request */}
        {/* <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
        title="preview"
        height="100%"
        width="90%"
        style={{
          textAlign: 'center',
          margin: 16,
        }}
      /> */}
        {/* <Preview code={codeOutput} /> */}
      </div>
    </Provider>
  );
};

export default App;
