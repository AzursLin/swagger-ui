/* eslint-disable react/jsx-key */
import React from "react"
import PropTypes from "prop-types"
import { Button } from "antd"
import { Row, Col } from 'antd'
import { AutoComplete  } from 'antd';

export default class Zfbmenu extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      dataSource:["aa","ab","bc"],
      arr:[]
    }
  }
  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
  }
  
/* href={`#operations-tag-${item.get("name")}`} */
  render() {
    const {specSelectors, getComponent} = this.props
    let {dataSource,arr}=this.state
    let tags = new Array
    let myTags = new Array
    let that=this
    let paths = specSelectors.paths()
    let pathList = new Array
    let urlList = new Map
    //paths(url路径)列表生成 字典生成
    for (let item of paths.keys()) {
      let sp = item.split("/")
      let substr = item
      // if (sp.length > 3) {
      //   substr = sp[sp.length-3]+"/"+sp[sp.length-2]+"/"+sp[sp.length-1]
      // } else {
      //   substr = item
      // }
      pathList.push(substr)
      let value =  paths.get(item).first().get("tags").first() + "-" + paths.get(item).first().get("operationId")
      urlList.set(substr,"#operations-"+value)
    }
    //tags列表生成 字典生成
    specSelectors.tags().map((item,idx) => (
      tags.push(item.get("name")) 
    ))
    tags.forEach(function(value, index, array) {
      urlList.set(value,"#operations-tag-"+value)
    })
    // for (let item of tags) {
    //   urlList[item.get("name")] = "#operations-tag-"+item.get("name")
    // }


    function handleSearch(searchValue){
      that.setState({
        arr:[]
      })
      tags.forEach(function(value, index, array) {
        if(value.includes(searchValue)) {
          myTags.push(value)
        }
      })

      pathList.forEach(function(value, index, array) {
        if(value.includes(searchValue)) {
          myTags.push(value)
        }
      })

      that.setState({
        arr:myTags
      })
    }
    function onSelect(searchValue) {
      let url = urlList.get(searchValue)
      window.location.href=url
    }
    return (
      <div id='zfb-menu' style= {{float:"top",position:"fixed",height:"90%",overflowY:"auto",width:"310px"}}>
        <AutoComplete style={{width:"98%"}} dataSource={arr} onSearch={handleSearch} onSelect={onSelect} placeholder="输入搜索"  />
        {
              tags.map((item) => (
                <Row>
                <Button  href={`#operations-tag-${item}`} style={{fontSize:"14px",width:"100%"}} >{item}</Button>
                </Row>
              ))
        }

      </div>

    )
  }

}
