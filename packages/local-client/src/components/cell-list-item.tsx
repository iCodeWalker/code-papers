import {Cell} from '../state/cell';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

import './cell-list-item.css';

interface CellListItemProp {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProp> = ({cell}) => {
  let child: JSX.Element;

  if (cell.type === 'code') {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar cellId={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar cellId={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
