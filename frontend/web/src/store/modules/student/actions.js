export function addRequest(data) {
  return {
    type: '@student/ADD_REQUEST',
    payload: { data },
  };
}

export function addRequestSuccess(data) {
  return {
    type: '@student/ADD_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function updateRequest(data, id) {
  return {
    type: '@student/UPDATE_REQUEST',
    payload: { data, id },
  };
}

export function updateRequestSuccess(data) {
  return {
    type: '@student/UPDATE_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function failure() {
  return {
    type: '@student/FAILURE',
  };
}
