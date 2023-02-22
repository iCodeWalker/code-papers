import React, {useState, useEffect} from 'react';

import {useActions} from '../hooks/useActions';
import {useTypedSelector} from '../hooks/useTypedSelector';

import CodeEditor from './code-editor';
import Preview from './preview';
import {Bundler} from '../bundler/';

import ResizableWrapper from './resizable-wrapper';
import {Cell} from '../state/cell';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const {updateCell, createBundle} = useActions();

  const bundleData = useTypedSelector(state => state.bundles[cell.id]);

  const cummalativeCode = useTypedSelector(state => {
    const {data, order} = state.cells;

    const orderedCells = order.map(id => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object'){
            if (value.$$typeof && value.props){
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
           
          } else {
            root.innerHTML = value;
          }
        };
      `;

    const showFuncNoop = `var show = () => {}`;

    const cummalativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cell.id) {
          cummalativeCode.push(showFunc);
        } else {
          cummalativeCode.push(showFuncNoop);
        }
        cummalativeCode.push(c.data);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cummalativeCode;
  });

  useEffect(() => {
    if (!bundleData) {
      createBundle(cell.id, cummalativeCode.join('\n'));
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cummalativeCode.join('\n'));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cummalativeCode.join('\n'), createBundle]);

  // const onSubmitCode = async () => {
  //   const bundledCode = await Bundler(input);
  //   setCodeOutput(bundledCode.code); // Our transpiled and bundled code
  // };

  return (
    <ResizableWrapper direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <ResizableWrapper direction="horizontal">
          <CodeEditor
            initialValue={cell.data}
            onChange={value => updateCell(cell.id, value)}
          />
        </ResizableWrapper>

        {/* <div>
          <button onClick={onSubmitCode}>Submit</button>
        </div> */}
        <div className="progress-wrapper">
          {!bundleData || bundleData.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundleData.code} err={bundleData.err} />
          )}
        </div>
        {/* {bundleData && <Preview code={bundleData.code} err={bundleData.err} />} */}
      </div>
    </ResizableWrapper>
  );
};

export default CodeCell;
