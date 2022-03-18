import { CircleFlag } from 'react-circle-flags'
import styled from "styled-components";
import SelectCurrency from 'react-select-currency';
import './Navbar.css';

const Container = styled.div`
    display: flex;
    background-color: #232347;
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 80px;
  `;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;

const SocialContainer = styled.div`
    display: flex;
  `;

const CountryIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;

const Center = styled.div`
    flex: 1;
    padding: 20px;
  `;

const Title = styled.h3`
    color: white;
    display:flex;
    font-size: 12px;
    font-weight: 600;
    margin-top: 10px;
    margin-right: 20px;
  `;

const Right = styled.div`
    flex: 1;
    display: flex;
    padding: 20px;
    position: absolute;
    right: 5px;
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
                <SocialContainer>
                    <CountryIcon>
                        <CircleFlag countryCode="us" height="25" />
                    </CountryIcon>
                    <Title>United States</Title>
                    <Title>|</Title>
                    <Title>English(US)</Title>
                    <Title>|</Title>
                    <SelectCurrency className='footer__currency' value={'USD'} />
                </SocialContainer>
            </Left>
            <Center>
            </Center>
            <Right>
                <Title>2022 Etsy, Inc</Title>
                <Title>Terms of Use</Title>
                <Title>Privacy</Title>
                <Title>Interest based ads</Title>
            </Right>
        </Container>
    );
};

export default Footer