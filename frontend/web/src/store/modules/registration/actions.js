export function addRequest(data) {
  return {
    type: '@registrion/ADD_REQUEST',
    payload: { data },
  };
}

export function addRequestSuccess(data) {
  return {
    type: '@registrion/ADD_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function updateRequest(data, id) {
  return {
    type: '@registrion/UPDATE_REQUEST',
    payload: { data, id },
  };
}

export function updateRequestSuccess(data) {
  return {
    type: '@registrion/UPDATE_REQUEST_SUCCESS',
    payload: { data },
  };
}

export function failure() {
  return {
    type: '@registrion/FAILURE',
  };
}
