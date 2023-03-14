
import  Facebook from "@material-ui/icons/Facebook";
import  Instagram  from "@material-ui/icons/Instagram";
import  MailOutline from "@material-ui/icons/MailOutline";
import  Phone from "@material-ui/icons/Phone";
import  Pinterest from "@material-ui/icons/Pinterest";
import  Room from "@material-ui/icons/Room";
import  Twitter from "@material-ui/icons/Twitter";

import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
  background-color: rgba(13,110,253,0.7) ;
  color: white; 
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>UCRList</Logo>
        <Desc>
          CS180 Project made by team C.K.L.G.S.T comprised of Carlos Alberto Velazquez Medina,
            Kenneth Salce, Seokha Kang, Gonzalo Ruiz, Toan Bao
        </Desc>
      </Left>
      <Center>
      </Center>
      <Right>
        <Title>Contact</Title>
        <List>
          <ListItem>tbao007@ucr.edu</ListItem>
        </List>
      </Right>
    </Container>
  );
};
export default Footer;