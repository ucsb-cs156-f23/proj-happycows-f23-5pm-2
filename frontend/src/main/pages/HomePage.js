mport { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';


import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsList from "main/components/Commons/CommonsList";
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import { commonsNotJoined } from "main/utils/commonsUtils";
import getBackgroundImage from "main/components/Utils/HomePageBackground";

// Define keyframes for gradient animation
const animateGradient = keyframes`
    to {
        background-position: 150%;
    }
`;

// Styled component for gradient animation
const GradientText = styled.div`
    animation: ${animateGradient} 6s infinite alternate-reverse;
    background-image: linear-gradient(to left, #464cb8, rgb(127, 165, 25));
    -webkit-background-clip: text;
    color: transparent;
    text-align: center;
    font-size: 40px;
`;

export default function HomePage({hour=null}) {
    const [commonsJoined, setCommonsJoined] = useState([]);
    const { data: currentUser } = useCurrentUser();

    const { data: commons } =
        useBackend(
            ["/api/commons/all"],
            { url: "/api/commons/all" },
            []
        );

    const objectToAxiosParams = (newCommonsId) => ({
        url: "/api/commons/join",
        method: "POST",
        params: {
            commonsId: newCommonsId
        }
    });

    const mutation = useBackendMutation(
        objectToAxiosParams,
        {},
        ["/api/currentUser"]
    );

    useEffect(
        () => {
            if (currentUser?.root?.user?.commons) {
                setCommonsJoined(currentUser.root.user.commons);
            }
        }, [currentUser]
    );

    const firstName = (currentUser?.root?.user?.givenName) || "";
    const time = (hour === null) ? new Date().getHours() : hour;
    const Background = getBackgroundImage(time);

    let navigate = useNavigate();
    const visitButtonClick = (id) => { navigate("/play/" + id) };

    const commonsNotJoinedList = commonsNotJoined(commons, commonsJoined);

    return (
        <div data-testid={"HomePage-main-div"} style={{ backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
            <BasicLayout>
                <Card
                    style={{ opacity: ".7" }}
                    className="my-3 border-0"
                >
                    <GradientText data-testid="homePage-title">
                        Howdy, Farmer {firstName}!
                    </GradientText>
                </Card>
                <Container>
                    <Row>
                        <Col sm><CommonsList commonList={commonsJoined} title="Visit A Commons" buttonText={"Visit"} buttonLink={visitButtonClick} /></Col>
                        <Col sm><CommonsList commonList={commonsNotJoinedList} title="Join A New Commons" buttonText={"Join"} buttonLink={mutation.mutate} /></Col>
                    </Row>
                </Container>
            </BasicLayout>
        </div>
    );
}

