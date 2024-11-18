import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE, GET_CURRENT_USER } from "./actionTypes"
import { profileSuccess, profileError, getCurrentuserSuccess, getCurrentuserFail } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile,
  postJwtProfile,
  getCurrentUser,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

function* editProfile({ payload: { user } }) {
  try {
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.editProfileAPI,
        user.username,
        user.idx
      )
      yield put(profileSuccess(response))
    } else if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    } else if (import.meta.env.VITE_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeProfile, {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    }
  } catch (error) {
    yield put(profileError(error))
  }
}


function* fetchUser({id}) {
  try {
    const response = yield call(getCurrentUser, id)
    yield put(getCurrentuserSuccess(response?.length > 0 ? response[0] : response))
  } catch (error) {
    yield put(getCurrentuserFail(error))
  }
}

export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
  yield takeEvery(GET_CURRENT_USER, fetchUser)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
