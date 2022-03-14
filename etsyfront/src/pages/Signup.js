import { useState } from "react";
import styled from "styled-components";
import { signup } from "../redux/user";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [bio, setBio] = useState("");
  // const [currency, setCurrency] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");

  const address = {
    address1,
    address2,
    city,
    state,
    country,
    zipcode,
  }


  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    // signup(dispatch, { name, email, password, gender, phone, birthday, bio, currency, address });
    signup(dispatch, { name, email, password, phone, address });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Signup</Title>
        <Form>
          <Input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Input
            placeholder="gender"
            onChange={(e) => setGender(e.target.value)}
          /> */}
          <Input
            placeholder="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          {/* <Input
            placeholder="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <Input
            placeholder="bio"
            onChange={(e) => setBio(e.target.value)}
          />
          <Input
            placeholder="currency"
            onChange={(e) => setCurrency(e.target.value)}
          /> */}
          <Input
            placeholder="address1"
            onChange={(e) => setAddress1(e.target.value)}
          />
          <Input
            placeholder="address2"
            onChange={(e) => setAddress2(e.target.value)}
          />
          <Input
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
          />
          <Input
            placeholder="country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            placeholder="zipcode"
            onChange={(e) => setZipcode(e.target.value)}
          />
          
          <Button onClick={handleClick} disabled={isFetching}>
            Signup
          </Button>
          {error && <Error>Something went wrong! Try again</Error>}
          <Link>Forgot Password?</Link>
          <Link>Login</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;