import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  FormikProps,
  FormWrapper,
  Input,
  Select,
  SelectOptions,
} from "@app/dekits/form";
import dayjs from "dayjs";
import { settingRegistrationSet } from "@app/api/tournament/setting-registration-set";
import { settingRegistrationStart } from "@app/api/tournament/setting-registration-start";
import { settingRegistrationStop } from "@app/api/tournament/setting-registration-stop";
import { SettingRegistrationData } from "@app/api/tournament/get-setting";
import { DateTime } from "../form-items/date-time";
// eslint-disable-next-line import/no-cycle
import {
  RegistrationFormValues,
  getInitialValues,
  getValidationSchema,
} from "./form-config";
import { OperatingFormValues } from "../operating/form-config";
import { useSubscription } from "@app/hooks/subscription";
import { Col, Row } from "react-bootstrap";
import { Field } from "formik";

interface RegistrationFormProps {
  operatingSetted: Boolean;
  operatingFormValue: OperatingFormValues;
  registrationFormRef: RefObject<FormikProps<RegistrationFormValues>>;
  initValues: SettingRegistrationData;
}

enum ButtonAction {
  SET,
  START,
  STOP,
}

export const currencyOptions: SelectOptions = [
  { label: "USDT", value: "USDT" },
  { label: "BTC", value: "BTC" },
  { label: "ETH", value: "ETH" },
];

export function RegistrationForm({
  operatingSetted,
  operatingFormValue,
  registrationFormRef,
  initValues,
}: RegistrationFormProps) {
  const [registrationInfo, changeRegistrationInfo] = useState({
    isSetted: false,
    isStarted: false,
    isStopped: false,
  });
  const [validationSchema, changeValidationSchema] = useState(() =>
    getValidationSchema(operatingFormValue)
  );
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    changeValidationSchema(() =>
      getValidationSchema(operatingFormValue)
    );
  }, [operatingFormValue]);

  const initialValues = useMemo<RegistrationFormValues>(
    () => getInitialValues(router.query.tournamentId as string, initValues),
    [router, initValues]
  );

  const handleSubmit = useCallback(
    (values: RegistrationFormValues) => {
      const params = {
        _id: router.query.tournamentId as string,
        registration: {
          fee: {
            is_require: Boolean(values.is_require),
            currency: values.currency,
            quantity: Number(values.quantity),
          },
          roster_size: Number(values.roster_size),
          start_time: dayjs(values.start_time).format("MM/DD/YYYY HH:mm:ss"),
          end_time: dayjs(values.end_time).format("MM/DD/YYYY HH:mm:ss"),
        },
      };

      const sub = settingRegistrationSet(params).subscribe(
        () => {
          changeRegistrationInfo({
            ...registrationInfo,
            isSetted: true,
          });
        },
        (error) => {
          alert(error?.response?.msg || "Error");
        }
      );
      subscription.add(sub);
    },
    [registrationInfo]
  );

  const onStart = () => {
    const sub = settingRegistrationStart({
      _id: router.query.tournamentId as string,
    }).subscribe(
      () => {
        changeRegistrationInfo({
          ...registrationInfo,
          isStarted: true,
          isStopped: false,
        });
      },
      (error) => {
        alert(error?.response?.msg || "Error");
      }
    );
    subscription.add(sub);
  };

  const onStop = () => {
    const sub = settingRegistrationStop({
      _id: router.query.tournamentId as string,
    }).subscribe(
      () => {
        changeRegistrationInfo({
          isSetted: false,
          isStarted: false,
          isStopped: true,
        });
      },
      (error) => {
        alert(error?.response?.msg || "Error");
      }
    );
    subscription.add(sub);
  };

  const getStatus = () => {
    const formValues = registrationFormRef.current;

    if (!formValues) return "Standby";

    if (
      !registrationInfo.isStarted ||
      dayjs(formValues.values.start_time).isBefore(dayjs())
    )
      return "Standby";

    if (registrationInfo.isStarted) return "Open";

    if (registrationInfo.isStopped) return "Close";

    return "Standby";
  };

  return (
    <FormWrapper<RegistrationFormValues>
      initialValues={initialValues}
      innerRef={registrationFormRef}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className='de-card-header'>
        <div className='de-card-title'>Registration</div>
        <div>
          <button
            type='button'
            className='de-btn de-btn-sm de-btn-outline-danger de-me-1'
            onClick={onStop}
            disabled={!registrationInfo.isStarted}
          >
            Stop
          </button>
          <button
            type='button'
            className='de-btn de-btn-sm de-btn-success text-capitalize'
            onClick={onStart}
            disabled={
              !registrationInfo.isSetted || registrationInfo.isStarted
            }
          >
            Start
          </button>
        </div>
      </div>
      <div className='de-card-body'>
        <Row className='de-gx-2'>
          <div className='de-bracket-status d-flex align-items-center de-mb-3'>
            <label>Status:</label>
            <span className='de-tag secondary'>Standby</span>
          </div>
        </Row>
        <Row className='de-gx-2'>
          <Col sm='12' md='3' lg='3'>
            <div className='de-form-group form-group d-flex align-items-center' style={{ height: 48 }}>
              <div className='de-form-check form-check mb-0'>
                <Field name='is_require' type='checkbox' className='de-form-check-input form-check-input mt-0' id='is_require' />
                <label className='de-form-check-label form-check-label' htmlFor='is_require'>
                  Fee required
                </label>
              </div>
            </div>
          </Col>
          <Col sm='12' md='9' lg='9'>
            <Row className='de-gx-2'>
              <Col sm='12' md='6' lg='6'>
                <div className='de-form-group form-group'>
                  <Input name='quantity' disabled={!operatingSetted} />
                </div>
              </Col>
              <Col sm='12' md='6' lg='6'>
                <div className='de-form-group form-group'>
                  <Select
                    name='currency'
                    options={currencyOptions}
                    disabled={!operatingSetted}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className='de-gx-2'>
          <Col sm='12' md='5' lg='5'>
            <DateTime
              name='start_time'
              label=''
              placeholder='pick time date'
              disabled={!operatingSetted}
            />
          </Col>
          <Col sm='12' md='5' lg='5'>
            <DateTime
              name='end_time'
              label=''
              placeholder='pick time date'
              disabled={!operatingSetted}
            />
          </Col>
          <Col sm='12' md='2' lg='2'>
            <div className='d-flex align-items-center' style={{ height: 48 }}>
              <button
                type='submit'
                className='de-btn de-btn-sm de-btn-link'
                disabled={!operatingSetted}
              >
                Set
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </FormWrapper>
  );
}
