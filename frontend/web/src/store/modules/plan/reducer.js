import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};
export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/ADD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/ADD_REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plan/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/UPDATE_REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@plan/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
