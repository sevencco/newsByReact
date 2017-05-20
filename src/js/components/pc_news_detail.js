import React from 'react';
import {Row,Col,BackTop} from 'antd';
import PCNewsImageBlock from './pc_news_image_block';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import CommomComments from './common_comments.js';

export default class PCNewsDetail extends React.Component{
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
			<div>
			<PCHeader/>
			<Row>
			<Col span={2}></Col>
			<Col span={14} className='container'>
			   <div className='articleContainer' dangerouslySetInnerHTML={this.createMarkup()}></div>
			   <CommomComments uniquekey={this.props.params.uniquekey} />
			</Col>
			<Col span={6}>
			<PCNewsImageBlock count={15} type='top' width="100%" cartTitle="相关新闻" imageWidth="132px"/>
			</Col>
			<Col span={2}></Col>
			</Row>
			<PCFooter/>
			<BackTop/>
			</div>
			);
		}
	}