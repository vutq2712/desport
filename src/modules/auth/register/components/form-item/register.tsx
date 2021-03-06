import { Field, ErrorMessage, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';
import { InputPassword, Input } from '@app/dekits/form';

interface FormItemType {
  name: string;
  label?: string;
  className?: string;
}

interface FormItemInputType extends FormItemType {
  name: string;
  type?: string;
  icon?: any;
}

export const FormItemInput = ({ name, label, type, icon }: FormItemInputType) => (
  <div className='de-form-group form-group'>
    {type === 'password'
      ? <InputPassword name={name} placeholder={label} />
      : <Input name={name} placeholder={label} icon={icon} />}

    <div className='de-form-error'>
      <ErrorMessage name={name} />
    </div>
  </div>
)

export const FormItemCheckbox = ({ name, label, className }: FormItemType) => (
  <div className='de-form-group de-form-check-wrap' style={{marginBottom: 0}}>
    <div className={`de-form-check form-check ${className}`}>
      <Field name={name} type='checkbox' value='1' />
      &nbsp;<label className='de-form-check-label form-check-label' htmlFor={name} dangerouslySetInnerHTML={{ __html: label || '' }}></label>
    </div>
    <div className='de-form-error' style={{marginBottom: 8, marginTop: 0}}>
      <ErrorMessage name={name} />
    </div>
  </div>
)

export const FormItemGender = ({ name }: FormItemType) => (
  <div className='mb-3 row'>
    <div className='col-sm-2 col-form-label' />
    <div className='col-sm-10'>
      <div role='group' aria-labelledby='my-radio-group'>
        <label>
          <Field type='radio' name={name} value='M' />
          &nbsp;Male
        </label>
        &nbsp;

        <label>
          <Field type='radio' name={name} value='F' />
          &nbsp;Female
        </label>
        &nbsp;

        <label>
          <Field type='radio' name={name} value='O' />
          &nbsp;Other
        </label>
      </div>
    </div>
  </div>
)

export const FormItemDate = ({ name, label }: FormItemType) => {
  const formik = useFormikContext<any>();

  return (
    <div className='de-form-group form-group'>
      <div className='de-form-control-with-icon right'>
        <DatePicker
          selected={formik.values[name] || ''}
          dateFormat='dd/MM/yyyy'
          placeholderText={label}
          className='de-form-control form-control'
          name='dob'
          onChange={(date: Date) => formik.setFieldValue('dob', date)}
          showYearDropdown
          dateFormatCalendar='MMMM'
          yearDropdownItemNumber={100}
          scrollableYearDropdown
          maxDate={new Date()}
        />
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M6 22C5.00797 21.9974 4.05718 21.6028 3.35478 20.9023C2.65237 20.2018 2.25527 19.252 2.25 18.26V9.26001C2.25264 8.26626 2.64858 7.31397 3.35127 6.61128C4.05396 5.90859 5.00625 5.51265 6 5.51001H7C7.18271 5.53122 7.35127 5.61883 7.47361 5.75618C7.59595 5.89354 7.66354 6.07107 7.66354 6.25501C7.66354 6.43895 7.59595 6.61648 7.47361 6.75384C7.35127 6.8912 7.18271 6.97881 7 7.00001H6C5.70162 6.99732 5.40571 7.05427 5.12964 7.16752C4.85357 7.28077 4.60292 7.44804 4.39239 7.6595C4.18186 7.87096 4.0157 8.12236 3.90367 8.39892C3.79164 8.67548 3.73599 8.97164 3.74 9.27001V18.27C3.73999 18.5659 3.79858 18.8588 3.9124 19.1319C4.02622 19.4049 4.19301 19.6528 4.40314 19.861C4.61326 20.0693 4.86256 20.2339 5.13665 20.3453C5.41073 20.4567 5.70416 20.5127 6 20.51H18C18.295 20.51 18.5871 20.4517 18.8595 20.3386C19.132 20.2254 19.3793 20.0595 19.5875 19.8504C19.7956 19.6413 19.9604 19.3932 20.0724 19.1203C20.1843 18.8474 20.2413 18.555 20.24 18.26V9.26001C20.2413 8.96454 20.1844 8.67169 20.0726 8.39821C19.9607 8.12472 19.7961 7.87595 19.5881 7.66609C19.3801 7.45622 19.1328 7.28939 18.8603 7.1751C18.5878 7.06082 18.2955 7.00132 18 7.00001H17C16.8028 7.00003 16.6135 6.92239 16.4732 6.78389C16.3328 6.64539 16.2526 6.45719 16.25 6.26001C16.2473 6.15937 16.2647 6.05921 16.3011 5.96534C16.3375 5.87146 16.3921 5.78575 16.4619 5.71319C16.5317 5.64062 16.6152 5.58263 16.7076 5.54261C16.7999 5.50258 16.8993 5.4813 17 5.48001H18C18.992 5.48264 19.9428 5.8772 20.6452 6.57773C21.3476 7.27826 21.7447 8.228 21.75 9.22001V18.22C21.7553 18.7154 21.6621 19.2068 21.4759 19.6659C21.2897 20.1249 21.0142 20.5424 20.6653 20.894C20.3164 21.2457 19.9012 21.5246 19.4436 21.7144C18.9861 21.9043 18.4954 22.0014 18 22H6Z' fill='#8B5CE4' />
          <path d='M10 7C9.80109 7 9.61032 6.92098 9.46967 6.78033C9.32902 6.63968 9.25 6.44891 9.25 6.25C9.25 6.05109 9.32902 5.86032 9.46967 5.71967C9.61032 5.57902 9.80109 5.5 10 5.5H14C14.1989 5.5 14.3897 5.57902 14.5303 5.71967C14.671 5.86032 14.75 6.05109 14.75 6.25C14.75 6.44891 14.671 6.63968 14.5303 6.78033C14.3897 6.92098 14.1989 7 14 7H10Z' fill='#8B5CE4' />
          <path d='M8.47995 8.51C7.88321 8.51 7.31091 8.27295 6.88896 7.85099C6.467 7.42903 6.22995 6.85674 6.22995 6.26V4.26C6.22731 3.96416 6.2833 3.67073 6.39468 3.39665C6.50607 3.12256 6.67065 2.87326 6.87892 2.66314C7.08718 2.45301 7.33501 2.28622 7.60809 2.1724C7.88117 2.05858 8.1741 1.99999 8.46995 2C9.06415 2.00261 9.63343 2.23913 10.0545 2.65836C10.4756 3.0776 10.7147 3.64581 10.7199 4.24V6.24C10.7215 6.53476 10.665 6.82694 10.5534 7.09978C10.4419 7.37263 10.2776 7.62077 10.0699 7.83C9.64818 8.25299 9.07725 8.49357 8.47995 8.5V8.51ZM8.47995 3.51C8.38192 3.50999 8.28487 3.52946 8.19443 3.56727C8.10399 3.60508 8.02197 3.66049 7.95312 3.73026C7.88427 3.80004 7.82998 3.8828 7.79338 3.97374C7.75679 4.06468 7.73862 4.16198 7.73995 4.26V6.26C7.74518 6.36134 7.77092 6.46056 7.81561 6.55166C7.8603 6.64276 7.92301 6.72384 7.99995 6.79C8.12673 6.9195 8.2988 6.99477 8.47995 7C8.67977 6.99737 8.87052 6.91614 9.0109 6.7739C9.15127 6.63165 9.22996 6.43984 9.22995 6.24V4.24C9.22473 4.04457 9.14342 3.85891 9.00333 3.72255C8.86324 3.5862 8.67544 3.50993 8.47995 3.51Z' fill='#8B5CE4' />
          <path d='M15.48 8.49C15.1844 8.4914 14.8914 8.43373 14.6184 8.3204C14.3454 8.20706 14.0977 8.04034 13.89 7.83C13.4679 7.40845 13.2305 6.83654 13.23 6.24V4.24C13.23 3.64591 13.466 3.07616 13.8861 2.65608C14.3061 2.236 14.8759 2 15.47 2C16.0642 2.00261 16.6335 2.23913 17.0546 2.65836C17.4757 3.0776 17.7147 3.64581 17.72 4.24V6.24C17.7213 6.53547 17.6644 6.82832 17.5525 7.1018C17.4407 7.37529 17.2761 7.62406 17.068 7.83393C16.86 8.04379 16.6127 8.21062 16.3403 8.32491C16.0678 8.43919 15.7755 8.49869 15.48 8.5V8.49ZM15.48 3.49C15.2828 3.49263 15.0946 3.57281 14.9561 3.71317C14.8176 3.85354 14.74 4.04281 14.74 4.24V6.24C14.74 6.43891 14.819 6.62968 14.9597 6.77033C15.1003 6.91098 15.2911 6.99 15.49 6.99C15.5885 6.99 15.686 6.9706 15.777 6.93291C15.868 6.89522 15.9507 6.83997 16.0203 6.77033C16.09 6.70069 16.1452 6.61801 16.1829 6.52701C16.2206 6.43602 16.24 6.33849 16.24 6.24V4.24C16.24 4.14066 16.2203 4.04231 16.1819 3.95066C16.1436 3.85901 16.0875 3.77588 16.0168 3.7061C15.9461 3.63633 15.8622 3.58129 15.7701 3.54419C15.6779 3.5071 15.5793 3.48868 15.48 3.49Z' fill='#8B5CE4' />
          <path d='M3 12C2.80109 12 2.61032 11.921 2.46967 11.7803C2.32902 11.6397 2.25 11.4489 2.25 11.25C2.25 11.0511 2.32902 10.8603 2.46967 10.7197C2.61032 10.579 2.80109 10.5 3 10.5H21C21.1989 10.5 21.3897 10.579 21.5303 10.7197C21.671 10.8603 21.75 11.0511 21.75 11.25C21.7528 11.3492 21.7352 11.448 21.6985 11.5402C21.6618 11.6325 21.6067 11.7163 21.5365 11.7865C21.4663 11.8567 21.3825 11.9118 21.2902 11.9485C21.198 11.9852 21.0992 12.0028 21 12H3Z' fill='#8B5CE4' />
        </svg>
      </div>
      <div className='de-form-error'>
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}
