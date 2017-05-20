import React from 'react';
import { Tabs,Row, Col,Carousel} from 'antd';
import PCNewsBlock from './pc_news_block.js';
import PCNewsImageBlock from './pc_news_image_block.js';
const TabPane=Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
	render(){
         const settings={
           dots: true,
           infinite:true,
           speed: 500,
           slidesToShow: 1,
           autoplay:true
         };

		return(
		<div>
         <Row>
           <Col span={2}></Col>
           <Col span={16} className='container'>

           <div className='leftContainer'>
           <div className='carousel' >
             <Carousel {...settings}>
                <div><img src='./src/images/carousel_1.jpg'/></div>
                <div><img src='./src/images/carousel_2.jpg'/></div>
                <div><img src='./src/images/carousel_3.jpg'/></div>
                <div><img src='./src/images/carousel_4.jpg'/></div>
             </Carousel>
           </div>
            <PCNewsImageBlock count={6} type="guoji" width='400px' cartTitle='国际头条' imageWidth='106px'/>
           </div>

           <Tabs>
           <TabPane tab="头条" key='1'>
           <PCNewsBlock count={22} type="top" width="100%"></PCNewsBlock>
           </TabPane>
           <TabPane tab="国际" key='2'>
           <PCNewsBlock count={22} type="guoji" width="100%"></PCNewsBlock>
           </TabPane>
           <TabPane tab="娱乐" key='3'>
           <PCNewsBlock count={22} type="yule" width="100%"></PCNewsBlock>
           </TabPane>
           </Tabs>

           <PCNewsImageBlock count={9} type="shehui" width='100%' cartTitle='社会头条' imageWidth='106px'/>
           <PCNewsImageBlock count={9} type="guoji" width='100%' cartTitle='科技新闻' imageWidth='106px'/>
           </Col>
           <Col span={6}>
           <div className="ad"><a href="https://item.jd.com/10214996308.html?jd_pop=4f81e62f-f989-4e35-85d6-d30744bdfbc5&abt=1&flt=1&utm_source=x.jd.com&utm_medium=adrealizable&utm_campaign=t_52006_116402552_75&utm_term=4f81e62ff9894e3585d6d30744bdfbc5-p_75">
           <img src='http://img1.360buyimg.com/pop/jfs/t5167/91/2585201805/76962/74cd3c05/591c0072Nc2173b44.jpg' alt='shop'/></a>
           </div>
           </Col>
         </Row>
        </div>
			)
	}
}