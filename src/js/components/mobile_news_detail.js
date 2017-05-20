import React from 'react';
import {Row,Col,BackTop} from 'antd';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
import CommomComments from './common_comments.js';

export default class MobileNewsDetail extends React.Component{
	constructor(){
		super();
		this.state={
			newsItem:""
		};
	}
	componentDidMount(){
		var myFetchOptions={
			method: 'GET'
		};
		var url="http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.params.uniquekey;
		fetch(url,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({newsItem:json});
			document.title=this.state.newsItem.title;
		});
	}

	createMarkup(){
		return({__html: this.state.newsItem.pagecontent});
	}

	render(){
		console.log(this.state.newsItem);
		return(
			<div id='mobileDetailsContainer'>
			<MobileHeader/>
			<div className='ucmobileList'>
			<Row>
			<Col span={24} className='container'>
			   <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
			   <CommomComments uniquekey={this.props.params.uniquekey} />
			</Col>
			</Row>
			<MobileFooter/>
			<BackTop/>
			</div>
			</div>
			);
		}
	}