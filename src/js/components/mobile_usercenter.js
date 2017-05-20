import React from 'react';
import { Menu, Icon,Tabs,message,Row, Col,notification,
         Modal,Form,Input,Button,CheckBox,Card
       } from 'antd';
import {Link} from 'react-router';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;

export default class MobileUserCenter extends React.Component{
constructor(){
  super();
  this.state={
    usercollection: '',
    usercomments: '',
    previewImage: '',
    previewVisible: false
  };
}

componentDidMount(){
  var myFetchOptions={method:'GET'};
  var urls="http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userId;
  var urlp="http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userId;
  fetch(urls,myFetchOptions)
  .then(response=>response.json())
  .then(json=>{
    this.setState({usercollection:json});
  });

  fetch(urlp,myFetchOptions)
  .then(response=>response.json())
  .then(json=>{
    this.setState({usercomments:json});
  });
}

render(){
  const {usercollection,usercomments}=this.state;
    const usercollectionList=usercollection.length?usercollection.map((uc,index)=>(
       <Card key={index}  extra={<a href={`/#/details/${uc.uniquekey}`} >查看</a>} >
        <p>{uc.Title}</p>
       </Card>
      ))
    :
    '您还没有收藏任何新闻，快去收藏喜欢的文章吧';

    const usercommentsList=usercomments.length?usercomments.map((comment,index)=>(
       <Card key={index} title={`您于${comment.datetime}评论了该文章`} extra={<a href={`/#/details/${comment.uniquekey}`} >查看</a>} >
        <p>{comment.Comments}</p>
       </Card>
      ))
    :
    '您还没有评论任何新闻，快去评论喜欢的文章吧';

	return(
		<div>
		<MobileHeader/>
		<Row>
          <Col span={24}>
            <Tabs>
             <TabPane tab='我的收藏' key='1'>
                  <Row>
                      <Col span={24}>
                        {usercollectionList}
                      </Col>
                  </Row>
             </TabPane>
             <TabPane tab='我的评论' key='2'>
              <Row>
                      <Col span={24}>
                        {usercommentsList}
                      </Col>
                  </Row>
                  </TabPane>
             <TabPane tab='头像设置' key='3'></TabPane>
            </Tabs>
          </Col>
		</Row>
          <MobileFooter/>
          </div>
		);
}
}