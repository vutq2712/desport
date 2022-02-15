import { FormWrapper, Select, SelectOptions } from "@app/dekits/form";
import { Col, Row } from "react-bootstrap";

export function Contribute() {
  const currencies: SelectOptions = [
    { value: 'BUSD', label: 'BUSD' },
    { value: 'BTC', label: 'BTC' }
  ];
  return (
    <>
      <h4 className='de-mb-3'>Contribute to cod mobile #3 prizepool</h4>
      <Row className='de-gx-3'>
        <Col lg='5'>
          <FormWrapper<any>
            initialValues={{ currency:'BUSD' }}
            onSubmit={() => { }}
          >
            <div className='de-card bordered de-py-4 de-px-5'>
              <div className='de-card-header'>
                <div className='de-card-title'>Contribute</div>
              </div>
              <div className='de-card-body'>
                <div className='de-form-group form-group'>
                  <Row className='gx-0'>
                    <Col md='9' xs='10'>
                      <div className='de-password-control de-form-control-with-icon'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M2.18994 15.56C1.99183 15.5574 1.80257 15.4776 1.66248 15.3375C1.52238 15.1974 1.44253 15.0081 1.43994 14.81V11.52C1.43994 11.3211 1.51896 11.1303 1.65961 10.9897C1.80026 10.849 1.99103 10.77 2.18994 10.77C2.38885 10.77 2.57962 10.849 2.72027 10.9897C2.86092 11.1303 2.93994 11.3211 2.93994 11.52V14.81C2.93994 15.0089 2.86092 15.1997 2.72027 15.3403C2.57962 15.481 2.38885 15.56 2.18994 15.56Z' fill='currentColor' />
                          <path d='M11.9999 16.9999C6.07994 16.9999 1.43994 14.0899 1.43994 10.3499C1.43994 6.60994 6.07994 3.68994 11.9999 3.68994C17.9199 3.68994 22.5499 6.60994 22.5499 10.3499C22.5499 14.0899 17.9199 16.9999 11.9999 16.9999ZM11.9999 5.18994C7.08994 5.18994 2.93994 7.54994 2.93994 10.3499C2.93994 13.1499 7.08994 15.5199 11.9999 15.5199C16.9099 15.5199 21.0499 13.1499 21.0499 10.3499C21.0499 7.54994 16.9099 5.18994 11.9999 5.18994Z' fill='currentColor' />
                          <path d='M12 20.3199C6.08995 20.3199 1.44995 17.3899 1.44995 13.6499C1.44995 13.451 1.52897 13.2602 1.66962 13.1196C1.81027 12.9789 2.00104 12.8999 2.19995 12.8999C2.39886 12.8999 2.58963 12.9789 2.73028 13.1196C2.87093 13.2602 2.94995 13.451 2.94995 13.6499C2.94995 16.4499 7.09995 18.8199 12 18.8199C16.9 18.8199 20.94 16.5499 21.07 13.7699V13.6499C21.07 13.451 21.149 13.2602 21.2896 13.1196C21.4303 12.9789 21.621 12.8999 21.82 12.8999C22.0189 12.8999 22.2096 12.9789 22.3503 13.1196C22.4909 13.2602 22.57 13.451 22.57 13.6499V13.8099C22.3899 17.4699 17.76 20.3199 12 20.3199Z' fill='currentColor' />
                          <path d='M21.7999 14.5601C21.6018 14.5575 21.4126 14.4777 21.2725 14.3376C21.1324 14.1975 21.0525 14.0082 21.0499 13.8101V10.3501C21.0499 10.1512 21.1289 9.96042 21.2696 9.81977C21.4103 9.67911 21.601 9.6001 21.7999 9.6001C21.9988 9.6001 22.1896 9.67911 22.3303 9.81977C22.4709 9.96042 22.5499 10.1512 22.5499 10.3501V13.8101C22.5499 13.9086 22.5305 14.0061 22.4928 14.0971C22.4551 14.1881 22.3999 14.2708 22.3303 14.3404C22.2606 14.4101 22.1779 14.4653 22.0869 14.503C21.9959 14.5407 21.8984 14.5601 21.7999 14.5601Z' fill='currentColor' />
                        </svg>
                        <input type='text' placeholder='contribute Amount' className='de-form-control form-control' />
                        <button type='button' className='de-btn-max'>
                          <span>Max</span>
                        </button>
                      </div>
                      <div className='de-form-bottom-label de-mb-0'>Balance: 10.000</div>
                    </Col>
                    <Col md='3' xs='2'>
                      <Select
                        name='currency'
                        options={currencies}
                      />
                    </Col>
                  </Row>
                </div>

                <div className='de-form-group form-group de-mb-4'>
                  <Row className='gx-0'>
                    <Col md='9' xs='10'>
                      <div className='de-password-control de-form-control-with-icon'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M13.08 20.4901C11.6861 20.4802 10.3147 20.1373 9.08004 19.4901C8.90829 19.3966 8.7792 19.2405 8.7196 19.0543C8.66 18.868 8.67448 18.666 8.76004 18.4901C8.85169 18.3165 9.00774 18.1858 9.19471 18.126C9.38167 18.0661 9.58464 18.082 9.76004 18.1701C11.2009 18.911 12.8467 19.1537 14.44 18.8601C15.7143 18.6087 16.8977 18.0195 17.8664 17.1541C18.835 16.2888 19.5534 15.1791 19.9465 13.9411C20.3395 12.7031 20.3927 11.3823 20.1006 10.1167C19.8085 8.85108 19.1817 7.6872 18.2858 6.74673C17.3899 5.80626 16.2578 5.12373 15.0079 4.77053C13.7579 4.41732 12.4361 4.40639 11.1805 4.73889C9.92484 5.07139 8.78162 5.7351 7.87031 6.66064C6.95899 7.58617 6.31306 8.73953 6.00004 10.0001C5.54986 11.8707 5.85527 13.8433 6.85004 15.4901C6.94406 15.6572 6.97055 15.8539 6.92405 16.0399C6.87756 16.2259 6.76162 16.387 6.60004 16.4901C6.43298 16.5842 6.23626 16.6106 6.05029 16.5642C5.86431 16.5177 5.7032 16.4017 5.60004 16.2401C4.86971 15.0326 4.44301 13.666 4.35651 12.2574C4.27 10.8488 4.52626 9.44027 5.10334 8.15242C5.68041 6.86457 6.56109 5.73582 7.66993 4.86287C8.77877 3.98991 10.0827 3.39879 11.47 3.14014C13.7522 2.71447 16.11 3.21282 18.0248 4.52558C19.9395 5.83833 21.2544 7.85795 21.68 10.1401C22.1057 12.4223 21.6074 14.7801 20.2946 16.6949C18.9818 18.6096 16.9622 19.9245 14.68 20.3501C14.1515 20.4414 13.6163 20.4882 13.08 20.4901Z' fill='currentColor' />
                          <path d='M5.33001 20.9999C5.09027 21.0056 4.85298 20.9506 4.64026 20.8398C4.42755 20.7291 4.24635 20.5663 4.11356 20.3666C3.98076 20.1669 3.90071 19.9369 3.88085 19.6979C3.861 19.4589 3.90199 19.2188 4.00001 18.9999L5.53001 15.5799C5.57004 15.4887 5.62782 15.4064 5.69999 15.3378C5.77215 15.2692 5.85726 15.2156 5.95035 15.1803C6.04343 15.1449 6.14263 15.1284 6.24216 15.1318C6.34168 15.1351 6.43953 15.1583 6.53001 15.1999C6.71236 15.2828 6.85459 15.4344 6.92575 15.6217C6.99691 15.809 6.99126 16.0168 6.91001 16.1999L5.48001 19.4499L9.15001 18.1399C9.24441 18.0985 9.34633 18.0769 9.44942 18.0767C9.5525 18.0764 9.65454 18.0974 9.74916 18.1383C9.84377 18.1792 9.92894 18.2392 9.99933 18.3145C10.0697 18.3898 10.1238 18.4788 10.1583 18.576C10.1927 18.6732 10.2068 18.7764 10.1996 18.8792C10.1924 18.982 10.164 19.0823 10.1163 19.1737C10.0686 19.2651 10.0026 19.3456 9.92236 19.4104C9.84213 19.4751 9.74942 19.5226 9.65001 19.5499L5.80001 20.9199C5.64956 20.9751 5.49025 21.0022 5.33001 20.9999Z' fill='currentColor' />
                        </svg>
                        <input type='text' placeholder='contribute Amount' className='de-form-control form-control' />
                        <button type='button' className='de-btn-max'>
                          <span>Max</span>
                        </button>
                      </div>
                      <div className='de-form-bottom-label de-mb-0'>You have contributed: 1,000 USD</div>
                    </Col>
                  </Row>
                </div>

                <div className='de-contribute-benefit'>Benefit</div>

                <button className='de-btn de-btn-primary w-100'>
                  <span>contribute</span>
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1.64246 11.6701C1.49388 11.6682 1.35193 11.6083 1.24686 11.5032C1.14179 11.3982 1.0819 11.2562 1.07996 11.1076V8.64014C1.07996 8.49095 1.13922 8.34788 1.24471 8.24239C1.3502 8.1369 1.49327 8.07764 1.64246 8.07764C1.79164 8.07764 1.93471 8.1369 2.0402 8.24239C2.14569 8.34788 2.20496 8.49095 2.20496 8.64014V11.1076C2.20496 11.2568 2.14569 11.3999 2.0402 11.5054C1.93471 11.6109 1.79164 11.6701 1.64246 11.6701Z' fill='currentColor' />
                    <path d='M8.99996 12.7501C4.55996 12.7501 1.07996 10.5676 1.07996 7.76258C1.07996 4.95758 4.55996 2.76758 8.99996 2.76758C13.44 2.76758 16.9125 4.95758 16.9125 7.76258C16.9125 10.5676 13.44 12.7501 8.99996 12.7501ZM8.99996 3.89258C5.31746 3.89258 2.20496 5.66258 2.20496 7.76258C2.20496 9.86258 5.31746 11.6401 8.99996 11.6401C12.6825 11.6401 15.7875 9.86258 15.7875 7.76258C15.7875 5.66258 12.6825 3.89258 8.99996 3.89258Z' fill='currentColor' />
                    <path d='M8.9999 15.2403C4.5674 15.2403 1.0874 13.0428 1.0874 10.2378C1.0874 10.0886 1.14667 9.94553 1.25215 9.84005C1.35764 9.73456 1.50072 9.67529 1.6499 9.67529C1.79909 9.67529 1.94216 9.73456 2.04765 9.84005C2.15314 9.94553 2.2124 10.0886 2.2124 10.2378C2.2124 12.3378 5.3249 14.1153 8.9999 14.1153C12.6749 14.1153 15.7049 12.4128 15.8024 10.3278V10.2378C15.8024 10.0886 15.8617 9.94553 15.9672 9.84005C16.0726 9.73456 16.2157 9.67529 16.3649 9.67529C16.5141 9.67529 16.6572 9.73456 16.7627 9.84005C16.8681 9.94553 16.9274 10.0886 16.9274 10.2378V10.3578C16.7924 13.1028 13.3199 15.2403 8.9999 15.2403Z' fill='currentColor' />
                    <path d='M16.35 10.9202C16.2014 10.9183 16.0594 10.8584 15.9544 10.7533C15.8493 10.6482 15.7894 10.5063 15.7875 10.3577V7.7627C15.7875 7.61351 15.8467 7.47044 15.9522 7.36495C16.0577 7.25946 16.2008 7.2002 16.35 7.2002C16.4992 7.2002 16.6422 7.25946 16.7477 7.36495C16.8532 7.47044 16.9125 7.61351 16.9125 7.7627V10.3577C16.9125 10.4316 16.8979 10.5047 16.8697 10.573C16.8414 10.6412 16.8 10.7032 16.7477 10.7554C16.6955 10.8077 16.6335 10.8491 16.5652 10.8774C16.497 10.9056 16.4238 10.9202 16.35 10.9202Z' fill='currentColor' />
                  </svg>
                </button>
              </div>
            </div>
          </FormWrapper>
        </Col>
      </Row>
    </>
  )
}
