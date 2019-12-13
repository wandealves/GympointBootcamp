import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};
export default function registration(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registrion/ADD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registrion/ADD_REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@registrion/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@registrion/UPDATE_REQUEST_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@registrion/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
