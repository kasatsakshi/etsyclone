import { CircleFlag } from 'react-circle-flags';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { updateCurrency } from '../redux/user';
import './Navbar.css';

const Container = styled.div`
    display: flex;
    background-color: #232347;
    position: absolute;
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

function Footer() {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCurrencyChange = async (currency) => {
    user
      ? await updateCurrency(dispatch, { userId: user.id, currency })
      : navigate('/login');

    window.location.reload();
  };

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
          <SelectCurrency defaultValue={user ? user.currency : 'USD'} onChange={(e) => handleCurrencyChange(e.target.value)}>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
          </SelectCurrency>
        </SocialContainer>
      </Left>
      <Center />
      <Right>
        <Title>2022 Etsy, Inc</Title>
        <Title>Terms of Use</Title>
        <Title>Privacy</Title>
        <Title>Interest based ads</Title>
      </Right>
    </Container>
  );
}

export default Footer;
