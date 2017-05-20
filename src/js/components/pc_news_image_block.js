import React from 'react';
import { Card} from 'antd';
import {Router,Route,Link,browserHistory} from 'react-router';

export default class PCNewsImageBlock extends React.Component{
	constructor(){
		super();
		this.state={
			news:""
		};
	}

	componentWillMount(){
		var myFetchOptions={method: 'GET' };
		var url="http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count;
		fetch(url,myFetchOptions)
		.then(response=>response.json())
		.then(json=>this.setState({news:json}));
	}

	render(){
        const styleImage={
        	display:'block',
        	width:this.props.imageWidth,
        	height:'90px'
            
        };
        const styleH3={
        	width:this.props.imageWidth,
        	whiteSpace:'nowrap',
        	overflow:'hidden',
        	textOverflow:'ellipsis'
        };
		const {news}=this.state;
		const newsList=news.length
		?
        news.map((newsItem,index)=>(
            <div key={index} className='imageblock'>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            <div>
            <img alt='' style={styleImage} src={newsItem.thumbnail_pic_s} />
            </div>
            <div>
            <h3 style={styleH3}>{newsItem.title}</h3>
            <p style={styleH3}>{newsItem.author_name}</p>
            </div>
            </Link>
            </div>
        	))
        :
        "没有加载到任何新闻!";

		return( 
          <div className='topNewsList'>
           <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
           {newsList}
           </Card>
          </div>
			);
	}
}