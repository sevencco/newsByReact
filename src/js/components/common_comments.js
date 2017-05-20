import React from 'react';
import { Menu, Icon,Tabs,message,Row, Col,notification,
         Modal,Form,Input,Button,CheckBox,Card
       } from 'antd';
import {Link} from 'react-router';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;

class CommomComments extends React.Component{
constructor(){
	super();
	this.state={
		comments:''
	};
}

componentDidMount(){
		var myFetchOptions={
			method: 'GET'
		};
		var url="http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey;
		fetch(url,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({comments:json});
		});
	}

handleSubmit(e){
 e.preventDefault();
 var myFetchOptions={
			method: 'GET'
		};
var formData=this.props.form.getFieldsValue();
var url="http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userId+"&uniquekey="+this.props.uniquekey+"&commnet="+formData.commentText;
		fetch(url,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.componentDidMount();
		});
		this.props.form.resetFields();
}

addUserCollection(){
	var myFetchOptions={
			method: 'GET'
		};
		var url="http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userId+"&uniquekey="+this.props.uniquekey;
		fetch(url,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			notification['success']({message: '本网提醒',description:'文章收藏成功'});
		});
}

render(){
	const {getFieldDecorator}=this.props.form;
	const {comments} =this.state;
	const commentList=comments.length?
	comments.map((comment,index)=>(
	<Card key={index} title={comment.UserName} extra={<a href='#'>{comment.datetime}</a>}>
	<p>{comment.Comments}</p>
	</Card>
	))
	:
	'没有加载到任何评论';

	return(
       <div className='comment'>
       <Row>
       <Col span={24}>
       <p>评论：</p>
       {commentList}
       <br/>
       <Form onSubmit={this.handleSubmit.bind(this)}>
       <FormItem label='您的评论'>
       {getFieldDecorator('commentText')(
       <Input type='textarea' placeholder='请输入您的评论...'  />
       )}
       </FormItem>
       <Button type='primary' htmlType='submit'>提交评论</Button>
       &nbsp;&nbsp;
       <Button type='primary' htmlType='button' onClick={this.addUserCollection.bind(this)}>收藏文章</Button>
       </Form>
       </Col>
       </Row>
       </div>
		);
   }
}

export default CommomComments=Form.create()(CommomComments);