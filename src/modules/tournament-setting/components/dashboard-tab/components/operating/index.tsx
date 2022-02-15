import { RefObject, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { FormikProps, FormWrapper } from "@app/dekits/form";
import dayjs from "dayjs";
import { settingOperatingSet } from "@app/api/tournament/setting-operating-set";
import { settingOperatingPublish } from "@app/api/tournament/setting-operating-publish";
import { settingOperatingClose } from "@app/api/tournament/setting-operating-close";
import { SettingOperatingData } from "@app/api/tournament/get-setting";
import { DateTime } from "../form-items/date-time";
import {
  OperatingFormValues,
  getInitialValues,
  getValidationSchema,
} from "./form-config";
import { useSubscription } from "@app/hooks/subscription";
import { Col, Row } from "react-bootstrap";

interface OperatingFormProps {
  changeOperatingSetted: (...args) => void;
  operatingFormRef: RefObject<FormikProps<OperatingFormValues>>;
  initValues: SettingOperatingData;
}

enum ButtonAction {
  SET,
  PUBLISH,
  CLOSE,
}

export function OperatingForm({
  initValues,
  changeOperatingSetted,
  operatingFormRef,
}: OperatingFormProps) {
  const [operatingInfo, changeOperatingInfo] = useState({
    isSetted: false,
    isPublished: false,
    isClosed: false,
  });
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    if (initValues.publish_status === "P") {
      changeOperatingInfo({
        isSetted: true,
        isPublished: true,
        isClosed: false,
      });
    }

    if (initValues.publish_status === "C") {
      changeOperatingInfo({
        isSetted: false,
        isPublished: false,
        isClosed: true,
      });
    }
  }, [initValues]);

  const initialValues = useMemo<OperatingFormValues>(
    () => getInitialValues(router.query.tournamentId as string, initValues),
    [router, initValues]
  );
  const validationSchema = getValidationSchema();

  const handleSubmit = useCallback(
    (values: OperatingFormValues) => {
      const params = {
        _id: router.query.tournamentId as string,
        start_time: dayjs(values.start_time).format("MM/DD/YYYY HH:mm:ss"),
        end_time: dayjs(values.end_time).format("MM/DD/YYYY HH:mm:ss"),
      };
      const sub = settingOperatingSet(params).subscribe(
        () => {
          changeOperatingInfo({
            ...operatingInfo,
            isSetted: true,
          });
          changeOperatingSetted(true);
        },
        (error) => {
          alert(error?.response?.msg || "Error");
        }
      );
      subscription.add(sub);
    },
    [operatingInfo, router, subscription]
  );

  const onPublish = () => {
    const sub = settingOperatingPublish({
      _id: router.query.tournamentId as string,
    }).subscribe(
      () => {
        changeOperatingInfo({
          ...operatingInfo,
          isPublished: true,
          isClosed: false,
        });
      },
      (error) => {
        alert(error?.response?.msg || "Error");
      }
    );
    subscription.add(sub);
  };

  const onClose = () => {
    const sub = settingOperatingClose({
      _id: router.query.tournamentId as string,
    }).subscribe(
      () => {
        changeOperatingInfo({
          isSetted: false,
          isPublished: false,
          isClosed: true,
        });
      },
      (error) => {
        alert(error?.response?.msg || "Error");
      }
    );
    subscription.add(sub);
  };

  const getStatus = () => {
    if (!operatingInfo.isPublished) return "Standby";

    const formValues = operatingFormRef.current;

    if (!formValues) return "Standby";

    if (dayjs(formValues.values.start_time).isBefore(dayjs())) {
      return "Upcoming";
    }

    if (!dayjs(formValues.values.start_time).isBefore(dayjs())) {
      return "Ongoing";
    }

    if (dayjs(formValues.values.end_time).isAfter(dayjs())) {
      return "Finished";
    }

    return "Standby";
  };

  return (
    <FormWrapper<OperatingFormValues>
      initialValues={initialValues}
      innerRef={operatingFormRef}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className='de-card-header'>
        <div className='de-card-title'>Operating</div>
        <div>
          <button
            type='button'
            className='de-btn de-btn-sm de-btn-outline-danger de-me-1'
            onClick={onClose}
            disabled={!operatingInfo.isPublished}
          >
            Close
          </button>
          <button
            type='button'
            className='de-btn de-btn-sm de-btn-success text-capitalize'
            onClick={onPublish}
            disabled={!operatingInfo.isSetted || operatingInfo.isPublished}
          >
            Publish
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
          <Col sm='12' md='5' lg='5'>
            <DateTime
              name='start_time'
              label=''
              placeholder='pick time date'
            />
          </Col>
          <Col sm='12' md='5' lg='5'>
            <DateTime name='end_time' label='' placeholder='pick time date' />
          </Col>
          <Col sm='12' md='2' lg='2'>
            <div className='d-flex align-items-center' style={{ height: 48 }}>
              <button
                type='submit'
                className='de-btn de-btn-sm de-btn-link'
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
