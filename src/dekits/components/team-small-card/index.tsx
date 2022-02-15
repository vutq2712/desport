import { Col, OverlayTrigger, Popover, Row } from "react-bootstrap";

export function TeamSmallCard(props) {
  return (
    <OverlayTrigger
      defaultShow={false}
      delay={100}
      trigger='hover'
      placement='top'
      overlay={
        <Popover className='de-popover'>
          <Popover.Body>
            <div className='de-popover-team-heading'>
              <img src={props.data?.logo} alt={props.data?.name} height={32} className='de-me-1' />
              <span>{props.data?.name}</span>
            </div>
            <Row className='de-gx-sm'>
              {props.data && props.data.memberInfo && props.data.memberInfo.map(m => (<Col lg='6' key={m._id}>
                <div className='de-user-card de-user-card-popover w-100'>
                  <div className='de-user-card-avatar'>
                    <img src={m.avatar} alt={m.name} />
                  </div>
                  <div className='de-user-card-info'>
                    <div className='de-user-card-username d-flex align-items-center flex-wrap de-mb-1'>
                      <span>{m.name}</span>
                      {props.data && m._id === props.data.captain && <span className='de-tag gradient-solid de-mb-0 de-ms-1 de-tag-user'>Captain</span>}
                      <img className='de-ms-1' src='/assets/images/flags/Vietnam.png' alt='vi' height={16} />
                      <svg className='de-ms-1' width='8' height='9' viewBox='0 0 8 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <circle cx='4' cy='4.5' r='4' fill='#609A5B' />
                      </svg>
                    </div>
                    {/*<div className='de-user-card-title'>Playing PUBG Mobile</div>*/}
                  </div>
                </div>
              </Col>))}
            </Row>
          </Popover.Body>
        </Popover>
      }
    >
      <div className='de-team-sm-card'>
        <div className='de-team-sm-card-inner de-mb-2'>
          <div className='team-sm-card-avatar'>
            <img src={props.data?.logo} alt={props.data?.name} height={32} className='de-me-1' />
            <div className='team-sm-card-name'>
              <span>{props.data && props.data.name}</span>
            </div>
          </div>
        </div>
        <div className='de-sub-info lg de-mb-1'>
          <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12.7868 12.6667C10.8735 12.6667 9.87345 10.8867 9.53345 10.1201H7.46678C7.12678 10.9134 6.12678 12.6667 4.21345 12.6667C1.62012 12.6667 1.62012 10.4867 1.62012 9.56008C1.62012 8.43341 3.42012 4.89341 3.78012 4.22675C3.82854 4.1535 3.89518 4.0941 3.97348 4.05436C4.05179 4.01462 4.13907 3.99592 4.22678 4.00008H12.7734C12.8657 4.00064 12.9561 4.0264 13.0348 4.07457C13.1136 4.12274 13.1776 4.1915 13.2201 4.27341C13.5801 4.94008 15.3801 8.48675 15.3801 9.60675C15.3801 10.5134 15.3801 12.6667 12.7868 12.6667ZM7.12678 9.14675H9.87345C9.97823 9.14581 10.0806 9.17825 10.1657 9.23938C10.2508 9.30051 10.3142 9.38715 10.3468 9.48675C10.3468 9.48675 11.1201 11.6934 12.7868 11.6934C14.2668 11.6934 14.3801 10.8201 14.3801 9.58675C14.3801 8.97341 13.3068 6.61342 12.4668 4.97341H4.53345C3.69345 6.61342 2.62012 8.97341 2.62012 9.58675C2.62012 10.8201 2.73345 11.6934 4.21345 11.6934C5.88012 11.6934 6.64678 9.50675 6.65345 9.48675C6.68601 9.38715 6.74944 9.30051 6.83455 9.23938C6.91965 9.17825 7.022 9.14581 7.12678 9.14675Z' fill='#8B5CE4' />
            <path d='M8.5 4.97347C8.38322 4.97396 8.26995 4.93357 8.17984 4.85929C8.08973 4.78501 8.02846 4.68153 8.00666 4.5668C7.94018 4.13657 7.96018 3.69741 8.06549 3.27501C8.1708 2.85261 8.35932 2.45546 8.62 2.1068C8.98117 1.72373 9.4241 1.42708 9.91582 1.23893C10.4075 1.05079 10.9354 0.975997 11.46 1.02013C11.5257 1.02013 11.5907 1.03307 11.6513 1.05819C11.712 1.08332 11.7671 1.12015 11.8135 1.16658C11.86 1.21301 11.8968 1.26813 11.9219 1.32879C11.9471 1.38945 11.96 1.45447 11.96 1.52013C11.96 1.58579 11.9471 1.65081 11.9219 1.71147C11.8968 1.77214 11.86 1.82726 11.8135 1.87369C11.7671 1.92012 11.712 1.95695 11.6513 1.98207C11.5907 2.0072 11.5257 2.02013 11.46 2.02013C11.0838 1.9818 10.7038 2.0264 10.3468 2.1508C9.9897 2.2752 9.66425 2.47636 9.39333 2.74013C9.05276 3.21696 8.90946 3.80687 8.99333 4.3868C9.00483 4.4516 9.00343 4.51803 8.9892 4.58228C8.97497 4.64654 8.9482 4.70735 8.91042 4.76123C8.87264 4.81512 8.82459 4.86102 8.76903 4.89629C8.71347 4.93157 8.6515 4.95553 8.58666 4.9668L8.5 4.97347Z' fill='#8B5CE4' />
          </svg>
          <span>ID: 012345</span>
        </div>
        <div className='de-sub-info lg'>
          <img src='/assets/images/flags/Vietnam.png' alt='' />
          <span>{props.data && props.data.country}</span>
        </div>
      </div>
    </OverlayTrigger>
  )
}
