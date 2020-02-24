/* eslint-disable react/jsx-key */
import React from "react"
import PropTypes from "prop-types"
import { Button } from "antd"

export default class Zfbmenu extends React.Component {
  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  }
/* href={`#operations-tag-${item.get("name")}`} */
  render() {
    const {specSelectors, getComponent} = this.props
    let tags = specSelectors.tags()
    return (
      <div id='zfb-menu' style= {{float:"left",position:"fixed",height:"300px",overflowY:"auto",width:"20%"}}>
        {
              tags.map((item,idx) => (
                <Button type="primary" style= {{width:"100%"}}>{item.get("name")}</Button>
                ))
        }

      </div>

    )
  }

}
