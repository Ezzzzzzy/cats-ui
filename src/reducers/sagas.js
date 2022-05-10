import { all } from 'redux-saga/effects'
import watchCatRequests from './Cat/CatSaga'

export default function* rootSaga() {
    yield all([
        watchCatRequests()
    ])
}