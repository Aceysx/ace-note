const UpdateStoreToLocalStorageMiddleware = store => next => action => {
  window.localStorage.setItem('store',JSON.stringify(store.getState()))
  return next(action)
}

export default UpdateStoreToLocalStorageMiddleware