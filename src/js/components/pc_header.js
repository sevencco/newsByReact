import React from 'react';
import { Menu, Icon,Tabs,message,Row, Col,
         Modal,Form,Input,Button,CheckBox
       } from 'antd';
import {Link} from 'react-router';
const FormItem=Form.Item;
const TabPane=Tabs.TabPane;

class PCHeader extends React.Component{
constructor(){
super();
this.state = {
    current: 'top',
    modalVisible: false,
    action: 'login',
    hasLogined: false,
    userNickName: '',
    userId: 0
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

handleClick(e){
if(e.key=='register'){
  this.setModalVisible(true);
}
  this.setState({current: e.key});

}

handleSubmit(e){
e.preventDefault();
var myFetchOptions={
  method: 'GET'
};
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
    this.setState({userNickName: json.NickUserName,
                   userId: json.UserId,
                   hasLogined: true
                  });
    localStorage.userId= json.UserId;
    localStorage.userNickName= json.NickUserName;
    hasLogined: true;
    console.log(this.state.userNickName);
    message.success("登录成功!");
  }
  this.setModalVisible(false);
});

}

changeTab(key){
this.props.form.resetFields();
if(key==1){
  this.setState({action: 'login'});
}else if(key==2){
  this.setState({action: 'register'});
}
}

logout(){
  localStorage.userId= '';
  localStorage.userNickName= '';
  this.setState({hasLogined: false});
}

render(){
  const {getFieldDecorator}=this.props.form;
  const userShow=this.state.hasLogined
  ?
  <Menu.Item key='logout' className='register'>
  <Button type="primary" htmlType='button'>{this.state.userNickName}</Button>
  &nbsp;&nbsp;
  <Link to={`/usercenter`} target="_blank">
  <Button type='ghost' htmlType='button'>个人中心</Button>
  </Link>
  &nbsp;&nbsp;
  <Button type='ghost' htmlType='button' onClick={this.logout.bind(this)}>退出</Button>
  </Menu.Item>
  :
  <Menu.Item key='register' className='register'>
    <Icon/>登录/注册
  </Menu.Item>;

	return(
    <header>
      <Row>
      <Col span={2}></Col>
      <Col span={4}>
        <a href="/" className="logo">                                                        
         <img src="./src/images/logo.png" alt="logo"/>
         <span>219新闻网</span>
        </a>
      </Col>
      <Col span={16}>
         <Menu onClick={this.handleClick.bind(this)} mode="horizontal" selectedKeys={[this.state.current]}>
           <Menu.Item key='top'>
           <Icon type="appstore" />头条
           </Menu.Item>
           <Menu.Item key='shehui'>
           <Icon type="appstore" />社会
           </Menu.Item>
           <Menu.Item key='guoji'>
           <Icon type="appstore" />国际
           </Menu.Item>
           <Menu.Item key='yule'>
           <Icon type="appstore" />娱乐
           </Menu.Item>
           <Menu.Item key='tiyu'>
           <Icon type="appstore" />体育
           </Menu.Item>
           <Menu.Item key='keji'>
           <Icon type="appstore" />科技
           </Menu.Item>
           <Menu.Item key='shishang'>
           <Icon type="appstore" />时尚
           </Menu.Item>
           {userShow}
         </Menu>

<Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText='关闭'>
  <Tabs type='line' onChange={this.changeTab.bind(this)}>
    <TabPane tab="登录" key="1">
      <Form horizontal>
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
          <Button type='primary' htmlType='button' onClick={this.handleSubmit.bind(this)}>登录</Button>
      </Form>
    </TabPane>

    <TabPane tab="注册" key="2">
      <Form horizontal>
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
          <Button type='primary' htmlType='button' onClick={this.handleSubmit.bind(this)}>注册</Button>
      </Form>
    </TabPane>
  </Tabs>
</Modal>

      </Col>
      <Col span={2}></Col>
    </Row>
    </header>
		);
}
}

export default PCHeader=Form.create()(PCHeader);
 