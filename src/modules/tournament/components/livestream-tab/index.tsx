import { LiveChat } from "@app/dekits/components/live-chat";
import { LivestreamCard } from "@app/dekits/components/livestream-card";
import { Col, Row } from "react-bootstrap";

export function LivestreamTab() {
  return (
    <div className='de-livestream-tab'>
      <Row className='de-gx-3'>
        <Col lg='8'>
          <div className='de-card full-h'>
            <div className='de-card-body'>
              <LivestreamCard vertical hidePlay />
            </div>
          </div>
        </Col>
        <Col lg='4'>
          <LiveChat />
        </Col>
      </Row>
    </div>
  )
}
