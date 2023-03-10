import { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
//import { mobile } from "../responsive";
interface directionProp {
	direction?: string;
	number?: number;
}

const Container = styled.div`
	width: 100%;
	height: 80vh;
	overflow: hidden;

`;
const Arrow = styled.div<directionProp>`
	width: 50px;
	height: 50px;
	background-color: #fff7f7;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === 'left' && '10px'};
	right: ${(props) => props.direction === 'right' && '10px'};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 2;
`;
const Wrapper = styled.div`
	height: 80%;
`;
const Slide = styled.div`
	width: 60vw;
	height: 80vh;
	display: flex;
	align-items: center;
`;
const ImgContainer = styled.div`
	height: 100%;
	flex: 1;
`;
const Image = styled.img`
	height: 100%
`;
const InfoContainer = styled.div`
    flex: 1;
    padding: 80px;
	margin-right: 30px;

`;
const Title = styled.h1`
	font-size: 70px;
`;
const Desc = styled.h1`
	margin: 50px 0px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`;

const Slider = () => {
	return (
		<Container>
			<Wrapper>
				<Slide>
					<ImgContainer>
						<Image src='https://www.highlandernews.org/wp-content/uploads/news.top25uni.RPoon_.jpg' />
					</ImgContainer>
					<InfoContainer>
						<Title>UCRLIFE</Title>
						<Desc>
							PRODUCTS ONLY FROM VERIFIED UCR
							STUDENTS.
						</Desc>
						<Desc>
							LOG IN TO SEE OFFERS.
						</Desc>
					</InfoContainer>
				</Slide>
			</Wrapper>
		</Container>
	);
};
export default Slider;
