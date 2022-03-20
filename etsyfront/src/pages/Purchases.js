import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div`
position: relative;
 min-height: 100vh;
 `;

const Wrapper = styled.div`
padding-bottom:80px;
margin-left: 100px;
margin-right:100px;
`;

function Purchases() {
    return (
        <Container>
            <Navbar />

            <Wrapper>


            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Purchases