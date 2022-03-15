import styled from "styled-components";
import { useEffect } from "react";
import { mobile } from "../responsive";
import { accountInfo } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;


const Account = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!user) {
          accountInfo(dispatch, { email: 's.k@xyz.com' });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const displayFields = ['name', 'email', 'phone', 'gender', 'birthday', 'currency', 'address']
  const displayFields = ['name', 'email', 'phone', 'address']
  const addressFields = ['address1', 'city', 'state', 'country', 'ZipCode']

  return (
    <Container>
      <Wrapper>

        <Title>Account Information</Title>

        <ul>
          {
            Object.keys(user).map(key => {
              if (displayFields.includes(key)) {
                if (key === 'address') {
                  return (
                    Object.keys(user.address).map(item => {
                      if (addressFields.includes(item)) {
                        return (
                          <li key="{item}">{`${item} - ${user.address[item]}`}</li>
                        )
                      }
                    })
                  )
                } else {
                  return (
                    <li key="{key}">{`${key} - ${user[key]}`}</li>
                  );
                }
              }
            })
          }
        </ul>
      </Wrapper>
    </Container>

  );
};

export default Account;