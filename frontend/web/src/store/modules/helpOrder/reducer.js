import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};
export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help_order/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@help_order/UPDATE_REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@help_order/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
