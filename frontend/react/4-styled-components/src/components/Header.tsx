import {Container} from './styles/Container.styled';
import {Flex} from './styles/Flex.styled';
import {StyledHeader, Nav, Logo, Image} from './styles/Header.styled';
import {Button} from './styles/Button.styled';

export const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Nav>
          <Logo src="./images/logo.svg" alt="" />
          <Button>Try It Free</Button>
        </Nav>

        <Flex>
          <div>
            <h1>Build The Community Your Fans Will Love</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate rem, quaerat excepturi fugit quas veritatis odio minus
              laudantium. Rerum, minus.
            </p>

            <Button bg="#ff0099" color="#fff">
              Get Started For Free
            </Button>
          </div>

          <Image src="./images/illustration-mockups.svg" />
        </Flex>
      </Container>
    </StyledHeader>
  );
};
