import {useActions} from '../hooks/useActions';
import ActionBarButton from './action-bar-button';

import './action-bar.css';

interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({cellId}) => {
  const {moveCell, deleteCell} = useActions();

  return (
    <div className="action-bar">
      <ActionBarButton
        icon="fas fa-arrow-up"
        onClick={() => moveCell(cellId, 'up')}
      />

      <ActionBarButton
        icon="fas fa-arrow-down"
        onClick={() => moveCell(cellId, 'down')}
      />

      <ActionBarButton icon="fas fa-times" onClick={() => deleteCell(cellId)} />
    </div>
  );
};

export default ActionBar;
