const UpdateStoreToLocalStorageMiddleware = store => next => action => {
  try {
    window.localStorage.setItem('store', JSON.stringify(store.getState()))
  } catch (e) {
  }
  return next(action)
}

export default UpdateStoreToLocalStorageMiddleware