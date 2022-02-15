import {Field} from "formik";
import React from "react";

export function NotificationSetting() {
  return (
    <div className='de-card full-h'>
      <div className='de-card-header'>
        <div className='de-card-title'>Notification Settings</div>
      </div>
      <div className='de-card-body'>
        <div className='de-form-check form-check de-mb-2'>
          <Field name='notification_tournament' type='checkbox' className='de-form-check-input form-check-input' id='chk1'/>
          <label className='de-form-check-label form-check-label' htmlFor='chk1'>
            Receive notification about tournaments.
          </label>
        </div>
        <div className='de-form-check form-check de-mb-2'>
          <Field name='notification_nextmatch' type='checkbox' className='de-form-check-input form-check-input' id='chk2'/>
          <label className='de-form-check-label form-check-label' htmlFor='chk2'>
            Receive notification before next match.
          </label>
        </div>
        <div className='de-form-check form-check de-mb-2'>
          <Field name='notification_news' type='checkbox' className='de-form-check-input form-check-input' id='chk3'/>
          <label className='de-form-check-label form-check-label' htmlFor='chk3'>
            Receive news and marketing emails.
          </label>
        </div>
      </div>
    </div>
  )
}
