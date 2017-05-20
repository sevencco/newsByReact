import React from 'react';
import { Row, Col,Modal } from 'antd';
import { Menu, Icon,Tabs,message,Form,Input,Button,CheckBox} from 'antd';
import {Link} from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;

class MobileHeader extends React.Component{
constructor(){
super();
this.state = {
    current: 'top',
    modalVisible: false,
    action: 'login',
    hasLogined: false,
    userNickName: '',
    userid: 0
  };
}

componentWillMount(){
    if(localStorage.userId != ''){
      this.setState({
        hasLogined: true,
        userNickName: localStorage.userNickName,
        userId: localStorage.userId
      })
    }
  }

setModalVisible(value){
this.setState({modalVisible:value});
this.props.form.resetFields();

}

handleSubmit(e){
e.preventDefault();
var myFetchOptions={
  method: 'GET'
}
var formData=this.props.form.getFieldsValue();
var url = this.state.action=='register'
    ?
      "http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&r_username="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword
    :
      "http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password
    ; 
   

fetch(url,myFetchOptions)
.then(response=>response.json())
.then(json=>{
  if(this.state.action=='register'){
    message.success("注册成功!");
  }else{
    console.log(json.NickUserName); 
    console.log(this.state);
    this.setState({userNickName: json.NickUserName,
                   userId: json.UserId,
                   hasLogined: true
                  });
     localStorage.userId= json.UserId;
    localStorage.userNickName= json.NickUserName;
    console.log(this.state.userNickName);
    message.success("登录成功!");
  }
  this.setModalVisible(false);
});

}

login(){
	this.setState({modalVisible:true});
};

changeTab(key){
this.props.form.resetFields();
if(key==1){
  this.setState({action: 'login'});
}else if(key==2){
  this.setState({action: 'register'});
}
}

render(){
	let {getFieldDecorator}=this.props.form;
	const userShow=this.state.hasLogined?
    <Link to={`/usercenter`}>
    <Icon type="inbox" />
    </Link>
     :
    <Icon type="setting" onClick={this.login.bind(this)} />;

	return(
		<div id="mobileheader">
           <header>
             <img src='./src/images/logo.png' alt='logo'/>
             <span>219新闻网</span>
             {userShow}
           </header>

           <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText='关闭'>
  <Tabs type='line' onChange={this.changeTab.bind(this)}>
    <TabPane tab="登录" key="1">
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label='账户'>
          {getFieldDecorator('userName')(
          <Input placeholder='请输入您的账号'/>
          )}
          </FormItem>
          <FormItem label='密码'>
          {getFieldDecorator('password')(
          <Input type='password' placeholder='请输入您的密码' />
          )}
          </FormItem>
          <Button type='primary' htmlType='submit'>登录</Button>
      </Form>
    </TabPane>

    <TabPane tab="注册" key="2">
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label='账户'>
          {getFieldDecorator('r_userName')(
          <Input placeholder='请输入您的账号'/>
          )}
          </FormItem>
          <FormItem label='密码'>
          {getFieldDecorator('r_password')(
          <Input type='password' placeholder='请输入您的密码' />
          )}
          </FormItem>
          <FormItem label='确认密码'>
          {getFieldDecorator('r_confirmPassword')(
          <Input type='password' placeholder='请确认您的密码'  />
          )}
          </FormItem>
          <Button type='primary' htmlType='submit'>注册</Button>
      </Form>
    </TabPane>
  </Tabs>
</Modal>
		</div>
			);
};
}

export default MobileHeader=Form.create()(MobileHeader);