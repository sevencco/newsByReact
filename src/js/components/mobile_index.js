import React from 'react';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
import MobileList from './mobile_list.js';
import {Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component{
render(){
	const settings={
           dots: false,
           infinite:true,
           speed: 500,
           slidesToShow: 1,
           autoplay:true
         };
	return(
		<div>
           <MobileHeader></MobileHeader>
           <Tabs>
				<TabPane tab='头条' key='1'>
				<div className='carousel' >
                <Carousel {...settings}>
                <div><img src='./src/images/carousel_1.jpg'/></div>
                <div><img src='./src/images/carousel_2.jpg'/></div>
                <div><img src='./src/images/carousel_3.jpg'/></div>
                <div><img src='./src/images/carousel_4.jpg'/></div>
                </Carousel>
                </div>
				<MobileList count={20} type='top'/>
				</TabPane>
                <TabPane tab='社会' key='2'>
                <MobileList count={20} type='shehui'/>
				</TabPane>
				<TabPane tab='国际' key='3'>
				<MobileList count={20} type='guoji'/>
				</TabPane>
				<TabPane tab='科技' key='4'>
				<MobileList count={20} type='keji'/>
				</TabPane>
				<TabPane tab='娱乐' key='5'>
				<MobileList count={20} type='yule'/>
				</TabPane>
                </Tabs>
           <MobileFooter></MobileFooter>
		</div>
			);
};
}