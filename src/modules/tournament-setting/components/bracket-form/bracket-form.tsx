import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { ErrorMessage, FormWrapper, Input, Select, SelectOptions, Switch, SchemaOf, FormikProps } from '@app/dekits/form';
import { BracketFormValues, getValidationSchema, getFormatOptions } from './form-config';
import { TeamFromBracket } from './form-items/team-from-bracket-input';
import { InputFromBracket } from './form-items/input-from-bracket';
import { TopTeamFromBracket } from './form-items/top-team-from-brackets';
import { BracketData, listBracket } from '@app/api/bracket/list-bracket';
import { useSubscription } from '@app/hooks/subscription';
import { Row, Col } from 'react-bootstrap';

interface BracketFormProps {
  initialFormValues: BracketFormValues;
  onSubmit: (values: BracketFormValues) => void;
}

export function BracketForm(props: BracketFormProps) {
  const subscription = useSubscription();
  const router = useRouter();

  const formatOptions = getFormatOptions();
  const validationSchema = getValidationSchema();

  const formRef = useRef<FormikProps<BracketFormValues>>(null);
  const [availableBrackets, setAvailableBrackets] = useState<BracketData[]>([])
  const [bracketOptions, setBracketOptions] = useState<SelectOptions>([]);

  function NameIcon() {
    return <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g opacity='0.8'>
        <path d='M18.7899 11.82C18.6911 11.8222 18.593 11.8038 18.5017 11.7659C18.4104 11.728 18.3281 11.6715 18.2599 11.6L13.0499 6.39996C12.9174 6.25779 12.8453 6.06974 12.8487 5.87544C12.8522 5.68114 12.9309 5.49576 13.0683 5.35834C13.2057 5.22093 13.3911 5.14222 13.5854 5.13879C13.7797 5.13536 13.9677 5.20748 14.1099 5.33996L19.3199 10.54C19.4604 10.6806 19.5393 10.8712 19.5393 11.07C19.5393 11.2687 19.4604 11.4593 19.3199 11.6C19.2507 11.6701 19.1681 11.7257 19.0771 11.7634C18.9861 11.8012 18.8885 11.8204 18.7899 11.82Z' fill='white' />
        <path d='M13.6302 11.77C13.5317 11.7704 13.434 11.7512 13.343 11.7134C13.252 11.6757 13.1694 11.6201 13.1002 11.55C12.9597 11.4094 12.8809 11.2187 12.8809 11.02C12.8809 10.8212 12.9597 10.6306 13.1002 10.49L18.3102 5.28998C18.3791 5.21922 18.4616 5.16298 18.5526 5.12459C18.6436 5.08619 18.7414 5.06641 18.8402 5.06641C18.939 5.06641 19.0368 5.08619 19.1278 5.12459C19.2188 5.16298 19.3013 5.21922 19.3702 5.28998C19.5107 5.4306 19.5895 5.62123 19.5895 5.81998C19.5895 6.01873 19.5107 6.20935 19.3702 6.34998L14.1602 11.55C14.0913 11.6205 14.0088 11.6764 13.9177 11.7142C13.8266 11.752 13.7288 11.771 13.6302 11.77Z' fill='white' />
        <path d='M7.79016 11.8C7.12166 11.8 6.46817 11.6018 5.91233 11.2304C5.35649 10.859 4.92327 10.3311 4.66745 9.71351C4.41162 9.0959 4.34469 8.41629 4.4751 7.76064C4.60552 7.10498 4.92744 6.50272 5.40014 6.03002C5.87284 5.55732 6.4751 5.2354 7.13075 5.10499C7.78641 4.97457 8.46601 5.0415 9.08363 5.29733C9.70124 5.55315 10.2291 5.98637 10.6005 6.54221C10.9719 7.09805 11.1702 7.75154 11.1702 8.42004C11.1675 9.31566 10.8106 10.1738 10.1773 10.8071C9.54396 11.4404 8.68578 11.7974 7.79016 11.8ZM7.79016 6.54004C7.41833 6.54004 7.05485 6.6503 6.74569 6.85688C6.43652 7.06345 6.19556 7.35707 6.05326 7.7006C5.91097 8.04412 5.87374 8.42213 5.94628 8.78681C6.01882 9.15149 6.19787 9.48648 6.4608 9.7494C6.72372 10.0123 7.0587 10.1914 7.42339 10.2639C7.78807 10.3365 8.16608 10.2992 8.5096 10.1569C8.85313 10.0146 9.14674 9.77368 9.35332 9.46451C9.5599 9.15535 9.67016 8.79187 9.67016 8.42004C9.67016 7.92143 9.47209 7.44325 9.11952 7.09068C8.76695 6.73811 8.28876 6.54004 7.79016 6.54004Z' fill='white' />
        <path d='M7.79016 20C7.12166 20 6.46817 19.8018 5.91233 19.4304C5.35649 19.059 4.92327 18.5311 4.66745 17.9135C4.41162 17.2958 4.34469 16.6162 4.4751 15.9606C4.60552 15.3049 4.92744 14.7027 5.40014 14.23C5.87284 13.7573 6.4751 13.4354 7.13075 13.3049C7.78641 13.1745 8.46601 13.2415 9.08363 13.4973C9.70124 13.7531 10.2291 14.1863 10.6005 14.7422C10.9719 15.298 11.1702 15.9515 11.1702 16.62C11.1675 17.5156 10.8106 18.3738 10.1773 19.0071C9.54396 19.6404 8.68578 19.9974 7.79016 20ZM7.79016 14.74C7.41833 14.74 7.05485 14.8503 6.74569 15.0568C6.43652 15.2634 6.19556 15.557 6.05326 15.9005C5.91097 16.2441 5.87374 16.6221 5.94628 16.9868C6.01882 17.3514 6.19787 17.6864 6.4608 17.9494C6.72372 18.2123 7.0587 18.3913 7.42339 18.4639C7.78807 18.5364 8.16608 18.4992 8.5096 18.3569C8.85313 18.2146 9.14674 17.9736 9.35332 17.6645C9.5599 17.3553 9.67016 16.9918 9.67016 16.62C9.67016 16.1214 9.47209 15.6432 9.11952 15.2906C8.76695 14.9381 8.28876 14.74 7.79016 14.74Z' fill='white' />
        <path d='M16.2101 20C15.5416 20 14.8881 19.8018 14.3323 19.4304C13.7764 19.059 13.3432 18.5311 13.0874 17.9135C12.8315 17.2958 12.7646 16.6162 12.895 15.9606C13.0254 15.3049 13.3474 14.7027 13.8201 14.23C14.2928 13.7573 14.895 13.4354 15.5507 13.3049C16.2063 13.1745 16.8859 13.2415 17.5035 13.4973C18.1212 13.7531 18.649 14.1863 19.0204 14.7422C19.3918 15.298 19.5901 15.9515 19.5901 16.62C19.5874 17.5156 19.2305 18.3738 18.5972 19.0071C17.9639 19.6404 17.1057 19.9974 16.2101 20ZM16.2101 14.74C15.8382 14.74 15.4748 14.8503 15.1656 15.0568C14.8564 15.2634 14.6155 15.557 14.4732 15.9005C14.3309 16.2441 14.2937 16.6221 14.3662 16.9868C14.4387 17.3514 14.6178 17.6864 14.8807 17.9494C15.1436 18.2123 15.4786 18.3913 15.8433 18.4639C16.208 18.5364 16.586 18.4992 16.9295 18.3569C17.273 18.2146 17.5667 17.9736 17.7732 17.6645C17.9798 17.3553 18.0901 16.9918 18.0901 16.62C18.0901 16.1214 17.892 15.6432 17.5394 15.2906C17.1869 14.9381 16.7087 14.74 16.2101 14.74Z' fill='white' />
      </g>
    </svg>
  }

  useEffect(() => {
    const listBracketSub = listBracket({ tournamentId: router.query.tournamentId as string })
      .subscribe(res => {
        setAvailableBrackets(res.data);

        setBracketOptions(res.data.map(bracket => ({
          label: bracket.name,
          value: bracket._id,
        })))
      });

    subscription.add(listBracketSub);
  }, [router, subscription]);

  return (
    <FormWrapper<BracketFormValues>
      initialValues={props.initialFormValues}
      innerRef={formRef}
      onSubmit={props.onSubmit}
      validationSchema={validationSchema}
    >

      <Row>
        <Col lg='8' md='10'>
          <h4 className='de-mb-4' style={{ fontWeight: 500 }}>Add Bracket</h4>
          <div className='de-card de-mb-3'>
            <div className='de-card-header'>
              <div className='de-card-title text-uppercase'>Bracket information</div>
            </div>
            <div className='de-card-body'>
              <Row className='de-gx-sm'>
                <Col xl='6'>
                  <div className='de-form-group form-group de-mb-3'>
                    <Input name='name' placeholder={t('tournament.bracket_name')} icon={NameIcon} />
                    <div className='de-form-error'>
                      <ErrorMessage name='name' />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className='de-gx-sm'>
                <Col xl='6'>
                  <div className='de-form-group form-group de-mb-3'>
                    <Select name='format' options={formatOptions} />
                    <div className='de-form-error'>
                      <ErrorMessage name='format' />
                    </div>
                  </div>
                </Col>
                <Col xl='3'>
                  <div className='de-form-group form-group de-mb-3 d-flex align-items-center' style={{ height: 48 }}>
                    <label className='de-me-2' style={{ paddingLeft: 12 }}>{t('tournament.3rd_vs_4th')}</label>
                    <Switch name='enable_3rd_vs_4th' />
                  </div>

                  {/* Swiss */}
                  {/* <div className='de-form-group form-group de-mb-3 d-flex align-items-center' style={{ height: 48, paddingLeft: 12 }}>
                <Switch name='enable_3rd_vs_4th' />
                <label className='de-ms-2'>Qualify by lose/win</label>
              </div> */}
                </Col>

                {/* Round Robin */}
                {/* <Col xl='6'>
              <div className='de-form-group form-group de-mb-3'>
                <select className='form-select de-form-control de-form-select'>
                  <option>Standard</option>
                </select>
              </div>
            </Col> */}
              </Row>

              {/* Swiss */}
              {/* <Row className='de-gx-sm'>
            <Col xl='6'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Win to qualify</label>
                <select className='form-select de-form-control de-form-select'>
                  <option>4</option>
                </select>
              </div>
            </Col>
            <Col xl='6'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Lose to disqualify</label>
                <select className='form-select de-form-control de-form-select'>
                  <option>4</option>
                </select>
              </div>
            </Col>
          </Row> */}

              {/* Round Robin */}
              {/* <div className='de-form-sub-title'>additional settings - per format/type</div>
          <Row className='de-gx-sm'>
            <Col lg='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Win score</label>
                <input type="number" className='form-control de-form-control' />
              </div>
            </Col>
            <Col lg='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Draw score</label>
                <input type="number" className='form-control de-form-control' />
              </div>
            </Col>
            <Col lg='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Lose score</label>
                <input type="number" className='form-control de-form-control' />
              </div>
            </Col>
          </Row> */}

              <div className='de-form-group form-group de-mb-0'>
                <label className='de-form-label form-label'>{t('tournament.start_date')}</label>
                <Row className='de-gx-sm'>
                  <Col xl='3'>
                    <Input name='start_date' />
                  </Col>
                  <Col xl='3'>
                    <Input name='start_date' />
                  </Col>
                </Row>
                <div className='de-form-error'>
                  <ErrorMessage name='start_date' />
                </div>
              </div>
            </div>
          </div>
          <div className='de-card de-mb-3'>
            <div className='de-card-header'>
              <div className='de-card-title text-uppercase'>bracket settings</div>
            </div>
            <div className='de-card-body'>
              <Row className='de-gx-sm'>
                <Col xl='3'>
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>{t('tournament.game_per_round')}</label>
                    <Input name='game_per_round' type='number' />
                    <div className='de-form-error'>
                      <ErrorMessage name='game_per_round' />
                    </div>
                  </div>
                </Col>
                <Col xl='3'>
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>{t('tournament.final_round')}</label>
                    <Input name='final_round' type='number' />
                    <div className='de-form-error'>
                      <ErrorMessage name='final_round' />
                    </div>
                  </div>
                </Col>

                {/* Swiss */}
                {/* <Col xl='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label opacity-0'>Fixed round</label>
                <div className='d-flex align-items-center' style={{ height: 48 }}>
                  <label className='de-me-2' style={{ paddingLeft: 12 }}>Fixed round</label>
                  <Switch name='fixed_round' />
                </div>
              </div>
            </Col> */}

                {/* Round Robin */}
                {/* <Col lg='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Number of teams</label>
                <input type="number" className='form-control de-form-control' />
              </div>
            </Col>
            <Col lg='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Number of round</label>
                <input type="number" className='form-control de-form-control' />
              </div>
            </Col>
            <Col lg='3'>
              <div className='de-form-group form-group de-mb-3'>
                <label className='de-form-label form-label'>Team per group</label>
                <input type="number" className='form-control de-form-control' />
              </div>
            </Col> */}
              </Row>
              <Row className='de-gx-sm'>
                <Col xl='3'>
                  <div className='de-form-group form-group de-mb-3 d-flex align-items-center'>
                    <label className='de-me-2'>{t('tournament.team_limit')}</label>
                    <Switch name='team_limit' />
                  </div>
                </Col>
              </Row>
              <Row className='de-gx-sm'>
                {/* Round Robin */}
                {/* <Col lg='3'>
                    <div className='de-form-group form-group de-mb-3'>
                      <label className='de-form-label form-label'>Number of group</label>
                      <input type="number" className='form-control de-form-control' />
                    </div>
                  </Col>
                  <Col lg='3'>
                    <div className='de-form-group form-group de-mb-3'>
                      <label className='de-form-label form-label'>Top team</label>
                      <input type="number" className='form-control de-form-control' />
                    </div>
                  </Col>

                  <Col xl='3'>
                    <div className='de-form-group form-group de-mb-3'>
                      <label className='de-form-label form-label'>{t('tournament.max_teams')}</label>
                      <Input name='max_teams' type='number' />
                      <div className='de-form-error'>
                        <ErrorMessage name='max_teams' />
                      </div>
                    </div>
                  </Col> */}
              </Row>

              <div className='de-form-group form-group de-mb-3'>
                <InputFromBracket availableBrackets={availableBrackets} />
              </div>
              <Row className='de-gx-sm'>
                <Col xl='3'>
                  <TeamFromBracket bracketOptions={bracketOptions} />
                </Col>
                <Col xl='3'>
                  <TopTeamFromBracket />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Battle Royal */}
      {/* <div className='de-card de-mb-3 de-pb-1'>
        <div className='de-card-header' style={{ minHeight: 0 }}>
          <div className='de-card-title text-uppercase'>point distribution</div>
        </div>
        <div className='de-card-body'>
          <Row>
            <Col xl="4">
              <Row className='de-gx-sm'>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Point per kill</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xl="4">
              <Row className='de-gx-sm'>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Place</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Points</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row className='de-gx-sm'>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Place</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Points</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row className='de-gx-sm'>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Place</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Points</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row className='de-gx-sm'>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Place</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Points</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row className='de-gx-sm'>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Place</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
                <Col xl="6">
                  <div className='de-form-group form-group de-mb-3'>
                    <label className='de-form-label form-label'>Points</label>
                    <input type="number" className='form-control de-form-control' />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <div className='de-form-group form-group de-mb-0'>
                <label className='de-form-label form-label opacity-0'>Add place</label>
                <div>
                  <button type="button" className='de-btn de-btn-outline-secondary'>
                    <span>Add place</span>
                    <svg className='de-ms-1' width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.5 12.3672C9.35082 12.3672 9.20774 12.3079 9.10225 12.2024C8.99676 12.0969 8.9375 11.9539 8.9375 11.8047V5.80469C8.9375 5.6555 8.99676 5.51243 9.10225 5.40694C9.20774 5.30145 9.35082 5.24219 9.5 5.24219C9.64918 5.24219 9.79226 5.30145 9.89775 5.40694C10.0032 5.51243 10.0625 5.6555 10.0625 5.80469V11.8047C10.0625 11.9539 10.0032 12.0969 9.89775 12.2024C9.79226 12.3079 9.64918 12.3672 9.5 12.3672Z" fill="currentColor" />
                      <path d="M12.4996 9.3675H6.49961C6.36257 9.3516 6.23616 9.28589 6.1444 9.18287C6.05265 9.07985 6.00195 8.94671 6.00195 8.80875C6.00195 8.67079 6.05265 8.53765 6.1444 8.43463C6.23616 8.33161 6.36257 8.2659 6.49961 8.25H12.4996C12.6488 8.25 12.7919 8.30926 12.8974 8.41475C13.0028 8.52024 13.0621 8.66332 13.0621 8.8125C13.0621 8.96168 13.0028 9.10476 12.8974 9.21025C12.7919 9.31574 12.6488 9.375 12.4996 9.375V9.3675Z" fill="currentColor" />
                      <path d="M9.50004 16.0799C9.40006 16.0806 9.30169 16.0547 9.21504 16.0049L3.40254 12.6524C3.31867 12.6014 3.24918 12.5299 3.20063 12.4446C3.15207 12.3593 3.12606 12.263 3.12504 12.1649V5.45235C3.12383 5.35377 3.1489 5.25664 3.19767 5.17096C3.24644 5.08528 3.31716 5.01414 3.40254 4.96485L9.21504 1.60485C9.30103 1.55691 9.39784 1.53174 9.49629 1.53174C9.59474 1.53174 9.69156 1.55691 9.77754 1.60485L15.59 4.96485C15.6774 5.01255 15.75 5.08313 15.8002 5.16902C15.8505 5.25492 15.8763 5.35287 15.875 5.45235V12.2024C15.874 12.3014 15.8471 12.3984 15.7972 12.4839C15.7472 12.5694 15.6758 12.6403 15.59 12.6899L9.77754 16.0424C9.69025 16.0801 9.59423 16.0931 9.50004 16.0799ZM4.25004 11.8349L9.50004 14.8349L14.75 11.8349V5.77485L9.50004 2.77485L4.25004 5.77485V11.8349Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div> */}

      <button type='submit' className='de-btn de-btn-primary'>Create</button>
    </FormWrapper >
  )
}
