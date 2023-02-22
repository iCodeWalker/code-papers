import {Fragment, useEffect} from 'react';

import {useTypedSelector} from '../hooks/useTypedSelector';
import CellListItem from './cell-list-item';
import {Cell} from '../state/cell';
import AddCell from './add-cell';
import {useActions} from '../hooks/useActions';

import './cell-list.css';

const CellList: React.FC = () => {
  const cells = useTypedSelector(state => {
    const {cells} = state;
    const {data, order} = cells;

    return order.map((id: string) => {
      return data[id];
    });
  });

  const {fetchCells} = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  const renderedCellsList = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCellsList}
    </div>
  );
};

export default CellList;
