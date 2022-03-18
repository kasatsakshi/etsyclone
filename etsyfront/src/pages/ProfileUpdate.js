import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from 'styled-components';

const Container = styled.div``;

const Form = styled.form``;

const Right = styled.div`
 position: absolute;
 right: 55px;
`;

const Title = styled.h2`
 margin-top: 30px;
 margin-left: 150px;
 font-weight: 500;
`;

const Subtitle = styled.h4`
 margin-left: 160px;
 font-weight: 500;
 color: grey;
`;

const ProfileUpdate = () => {
    return (
        <Container>
            <Navbar />
            <Title>Your Public Profile</Title>
            <Subtitle>Everything on this page can be seen by anyone</Subtitle>
            <Form>

            </Form>
            <Footer />
            <Right><button>View Profile</button></Right>
        </Container>
    )
}

export default ProfileUpdate