import produce from 'immer';

const INITIAL_STATE = {
  update: false,
  save: false,
  loading: false,
};
export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/ADD_REQUEST': {
        draft.loading = true;
        draft.save = true;
        draft.update = false;
        break;
      }
      case '@student/ADD_REQUEST_SUCCESS': {
        draft.loading = false;
        draft.save = true;
        draft.update = false;
        break;
      }
      case '@student/UPDATE_REQUEST': {
        draft.loading = true;
        draft.save = false;
        draft.update = true;
        break;
      }
      case '@student/UPDATE_REQUEST_SUCCESS': {
        draft.loading = false;
        draft.save = false;
        draft.update = true;
        break;
      }
      case '@student/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
