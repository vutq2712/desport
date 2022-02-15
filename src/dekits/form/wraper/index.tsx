import React from 'react'
import { Formik, Form, FormikConfig } from 'formik'

type Overwrite<T1, T2> = {
  [P in Exclude<keyof T1, keyof T2>]?: T1[P];
} & T2;

type FormWrapperProps<V> = Overwrite<FormikConfig<V>, {
  className?: string;
}>;

export function FormWrapper<V>(props: FormWrapperProps<V>) {
  const newProps: FormikConfig<V> = {
    ...props,
    initialValues: props.initialValues || {} as V,
    onSubmit: props.onSubmit || (() => { }),
  };

  return (
    <Formik
      {...newProps}
      validateOnChange
      validateOnBlur
    >
      <Form className={props.className}>{props.children}</Form>
    </Formik>
  )
}
