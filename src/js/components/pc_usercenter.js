import React from 'react';
import { Menu, Icon,Tabs,message,Row, Col,notification,
         Modal,Form,Input,Button,CheckBox,Card,Upload
       } from 'antd';
import {Link} from 'react-router';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;

export default class PCUserCenter extends React.Component{
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
       <Card key={index}  extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`} >查看</a>} >
        <p>{uc.Title}</p>
       </Card>
    	))
    :
    '您还没有收藏任何新闻，快去收藏喜欢的文章吧';

    const usercommentsList=usercomments.length?usercomments.map((comment,index)=>(
       <Card key={index} title={`您于${comment.datetime}评论了该文章`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`} >查看</a>} >
        <p>{comment.Comments}</p>
       </Card>
    	))
    :
    '您还没有评论任何新闻，快去评论喜欢的文章吧';

    const props={
        action: 'http://newsapi.gugujiankong.com/Handler.ashx',
    	headers: {
    		"Access-Control-Allow-Origin": "*"
    	},
    	listType: 'picture-card',
    	defaultFileList: [
    	{
    		uid:-1,
    		name: 'xxx.png',
    		state: 'done',
			url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
			thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
    	}],
    	onPreview: (file)=>{
    		this.setState({
    			previewImage: file.url,
    			previewVisible: true
    		});
    	}
    }

	return(
		<div>
		<PCHeader/>
		<Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
             <TabPane tab='我的收藏' key='1'>
               <div className='comment'>
                  <Row>
                      <Col span={24}>
                        {usercollectionList}
                      </Col>
                  </Row>
               </div>
             </TabPane>

             <TabPane tab='我的评论' key='2'>
             <div className='comment'>
                  <Row>
                      <Col span={24}>
                        {usercommentsList}
                      </Col>
                  </Row>
               </div>
               </TabPane>

             <TabPane tab='头像设置' key='3'>
               <div className="clearfix">
               <Upload {...props}>
               <Icon type='plus'/>
               <div className='ant-upload-text'>上传照片</div>
               </Upload>
               <Modal visible={this.state.previewVisible} footer={null} onCancle={this.handleCancle}>
               <img alt='预览' src={this.state.previewImage} />
               </Modal>
               </div>
             </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
		</Row>
          <PCFooter/>
          </div>
		);
}
}