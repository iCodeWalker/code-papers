import produce from 'immer';

import {ActionType} from '../action-types';
import {Action} from '../actions';
import {Cell} from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;
      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = '';
        return state;
      case ActionType.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map(cell => cell.id);

        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellState['data']);

        return state;
      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;
      case ActionType.UPDATE_CELL:
        const {id, data} = action.payload;

        state.data[id].data = data;
        return state;

      case ActionType.MOVE_CELL:
        const {direction} = action.payload;

        const index = state.order.findIndex(id => id === action.payload.id);

        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload]; // for deleting from data

        state.order = state.order.filter(id => id !== action.payload); // for deleting from array

        return state;
      case ActionType.INSERT_CELL_AFTER:
        const newCell: Cell = {
          id: randomId(),
          type: action.payload.type,
          data: '',
        };

        state.data[newCell.id] = newCell;

        const currentIndex = state.order.findIndex(
          id => id === action.payload.id,
        );

        if (currentIndex < 0) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(currentIndex + 1, 0, newCell.id);
        }
        return state;

      default:
        return state;
    }
  },
  initialState,
);

const randomId = () => {
  return Math.random().toString(36);
};

// const cellReducer = (
//   state: CellState = initialState,
//   action: Action,
// ): CellState => {
//   switch (action.type) {
//     case ActionType.UPDATE_CELL:
//       const {id, data} = action.payload;

//       return {
//         ...state,
//         data: {
//           ...state.data,
//           [id]: {
//             ...state.data[id],
//             data: data,
//           },
//         },
//       };
//     case ActionType.INSERT_CELL_BEFORE:
//       return state;
//     case ActionType.MOVE_CELL:
//       return state;
//     case ActionType.DELETE_CELL:
//       return state;

//     default:
//       return state;
//   }
// };

export default cellReducer;
