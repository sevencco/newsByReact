import React from 'react';
import { Card} from 'antd';
import {Router,Route,Link,browserHistory} from 'react-router';

export default class PCNewsBlock extends React.Component{
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
		console.log(this.state.news);
		const {news}=this.state;
		const newsList=news.length
		?
        news.map((newsItem,index)=>(
            <li key={index}>
              <Link to={`details/${newsItem.uniquekey}`} target="_blank">
              {newsItem.title}
              </Link>

            </li>
        	))
        :
        "没有加载到任何新闻!";

		return(
          <div className='topNewsList'>
           <Card style={{width:this.props.width}}>
           <ul>
           {newsList}
           </ul>
           </Card>
          </div>
			);
	}
}