

import React from "react"
import PropTypes from "prop-types"

export default class StandaloneLayout extends React.Component {

  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  }

  render() {
    let { getComponent } = this.props

    let Container = getComponent("Container")
    let Row = getComponent("Row")
    let Col = getComponent("Col")
    let Zfbmenu = getComponent("Zfbmenu", true)

    const Topbar = getComponent("Topbar", true)
    const BaseLayout = getComponent("BaseLayout", true)
    const OnlineValidatorBadge = getComponent("onlineValidatorBadge", true)


    return (

      <Container className='swagger-ui'>
        {Topbar ? <Topbar /> : null}
        <Zfbmenu ></Zfbmenu>
        <BaseLayout /> 
        <Row>
          <Col>
            <OnlineValidatorBadge />
          </Col>
        </Row>
      </Container>
    )
  }

}
