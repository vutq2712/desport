import { useRef, useState, useEffect } from "react";
import { FormikProps } from "formik";
import { deleteTournament } from "@app/api/tournament/delete-tournament";
import { useRouter } from "next/router";
import { getSetting, SettingData } from "@app/api/tournament/get-setting";
import { OperatingForm } from "./components/operating";
import { OperatingFormValues } from "./components/operating/form-config";
import { RegistrationForm } from "./components/registration";
import { RegistrationFormValues } from "./components/registration/form-config";
import { Bracket } from "./components/bracket";
import { PrizePool } from "./components/prize-pool";
import { AuthorizationSetting } from "./components/authorization-setting";
import { useSubscription } from "@app/hooks/subscription";
import { Col, Row } from "react-bootstrap";

export function DashboardTab() {
  const [loading, changeLoading] = useState<boolean>(true);
  const [settingDetail, changeSettingDetail] = useState<SettingData>(
    {} as SettingData
  );
  const [operatingSetted, changeOperatingSetted] = useState<boolean>(false);
  const operatingFormRef = useRef<FormikProps<OperatingFormValues>>(null);
  const registrationFormRef = useRef<FormikProps<RegistrationFormValues>>(null);
  const subscription = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const sub = getSetting(router.query.tournamentId as string).subscribe(
      (res) => {
        const settingDetailData = res.data;
        changeSettingDetail(settingDetailData);
        changeLoading(false);

        if (
          settingDetailData.operating?.start_time ||
          settingDetailData.operating?.end_time ||
          settingDetailData.operating?.publish_status === "P"
        ) {
          changeOperatingSetted(true);
        }
      },
      (error) => {
        alert(error?.response?.msg || "Error");
      }
    );
    subscription.add(sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDeleteTournament = () => {
    const sub = deleteTournament({
      _id: router.query.tournamentId as string,
    }).subscribe(() => {
      alert("Delete tournament success");
      router.push(`/my-tournament`);
    });
    subscription.add(sub);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='de-ts-dashboard'>
      <Row>
        <Col sm='12' md='12' lg='6'>
          <div className='de-card de-mb-3 operating-section'>
            <OperatingForm
              changeOperatingSetted={changeOperatingSetted}
              operatingFormRef={operatingFormRef}
              initValues={settingDetail?.operating || {}}
            />
          </div>
          <div className='de-card de-mb-3 bracket-section'>
            <Bracket />
          </div>
        </Col>
        <Col sm='12' md='12' lg='6'>
          <div className='de-card de-mb-3 registration-section'>
            <RegistrationForm
              registrationFormRef={registrationFormRef}
              operatingSetted={operatingSetted}
              operatingFormValue={
                (operatingFormRef.current?.values || {}) as OperatingFormValues
              }
              initValues={settingDetail?.registration || {}}
            />
          </div>
          <div className='de-card de-mb-3 prize-pool-section'>
            <PrizePool listPrizePool={settingDetail?.prizepool || []} />
          </div>
        </Col>
      </Row>

      <div className='de-card de-mb-3 authorization-section'>
        <AuthorizationSetting />
      </div>
      <button type='button' className='de-btn de-btn-outline-primary'>
        <span>delete the tournament</span>
      </button>
    </div>

  // <div>
  //   <OperatingForm
  //     changeOperatingSetted={changeOperatingSetted}
  //     operatingFormRef={operatingFormRef}
  //     initValues={settingDetail?.operating || {}}
  //   />
  //   <RegistrationForm
  //     registrationFormRef={registrationFormRef}
  //     operatingSetted={operatingSetted}
  //     operatingFormValue={(operatingFormRef.current?.values || {}) as OperatingFormValues}
  //     initValues={settingDetail?.registration || {}}
  //   />
  //   <Bracket />
  //   <PrizePool listPrizePool={settingDetail?.prizepool || []} />
  //   <AuthorizationSetting />
  //   <button type='button' className='btn btn-danger mt-2' onClick={onDeleteTournament}>Delete tournament</button>
  // </div>
  );
}
