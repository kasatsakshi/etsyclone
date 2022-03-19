import { CircleFlag } from 'react-circle-flags'
import styled from "styled-components";
import './Navbar.css';

const Container = styled.div`
    display: flex;
    background-color: #232347;
    position: relative;
    bottom: 0px;
    width: 100%;
    height: 80px;
    margin-top:50px;
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

const SelectCurrency = styled.select`
    font-size: 12px;
    font-weight: 600;
    background-color: #232347;
    border: none;
    color: white;
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
                    <SelectCurrency>
                        <option value='1'>USD</option>
                        <option value='2'>INR</option>
                        <option value='3'>GBP</option>
                    </SelectCurrency>
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