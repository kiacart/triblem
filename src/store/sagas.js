import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import calendarSaga from "./calendar/saga";
import chatSaga from "./chat/saga";
import templatessSaga from "./templates/saga";
import mailsSaga from "./mails/saga";
import contactsSaga from "./contacts/saga";
import dashboardSaga from "./dashboard/saga";
import metaSaga from "./meta/saga";
import broadcastSaga from "./broadcast/saga";
import agentSaga from "./agent/saga";
import planSaga from "./plans/saga";
import languageSaga from "./language/saga";
import demoSaga from "./book-demo/saga";
import faqSaga from "./faq/saga";
import testimonialSaga from "./testimonials/saga";
import bannerSaga from "./banners/saga";
import serviceSaga from "./service/saga";
import clientSaga from "./client/saga";
import librarySaga from "./template-manage/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(templatessSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(metaSaga),
    fork(demoSaga),
    fork(faqSaga),
    fork(broadcastSaga),
    fork(agentSaga),
    fork(planSaga),
    fork(languageSaga),
    fork(bannerSaga),
    fork(clientSaga),
    fork(serviceSaga),
    fork(testimonialSaga), 
    fork(librarySaga),
  ]);
}
