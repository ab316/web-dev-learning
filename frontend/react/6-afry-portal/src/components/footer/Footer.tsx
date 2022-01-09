import Container from 'components/utils/Container';
import styled from 'styled-components';
import './footer.css';

const StyledFooter = styled.footer`
  padding-top: 50px;
  padding-bottom: 50px;
  margin-top: 200px;
  box-shadow: 0px -2px 10px -1px rgba(0, 0, 0, 0.2);
`;

const StyledLogo = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-left: 10rem;
`;

const StyledLink = styled.a`
  color: #555;
  text-decoration: none;
`;

const StyledList = styled.ul`
  list-style: none;
  color: #aaa;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  margin-left: 1rem;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <StyledFlex>
          <section className="leftSection">
            <StyledLogo>
              <img src="images/AFRY-Logotype-Horizontal_Black.svg" alt="AFRY" />
            </StyledLogo>
            <div className="fieldsGroup">
              <p className="shareName">AFRY</p>
              <p>243.2 SEK (-4.5%)</p>
              <p>SSE | 19:47</p>
            </div>
            <div className="fieldsGroup">
              <p>
                <StyledLink href="https://afry.com/en/investor-relations/afry-share">The AFRY Share</StyledLink>
              </p>
              <p>
                <StyledLink href="https://afry.com/">afry.com</StyledLink>
              </p>
            </div>
          </section>

          <section className="rightSection">
            <div>
              <p>Follow us</p>
              <StyledList>
                <li>
                  <StyledLink href="https://www.linkedin.com/company/afry/">LinkedIn</StyledLink>
                </li>
                <li>
                  <StyledLink href="https://www.instagram.com/afry.official/">Instagram</StyledLink>
                </li>
                <li>
                  <StyledLink href="https://www.youtube.com/user/afconsultinsweden">Youtube</StyledLink>
                </li>
              </StyledList>
            </div>

            <div>
              <p>Support</p>
              <StyledList>
                <li>
                  <StyledLink href="https://www.yammer.com/afconsult.com/#/threads/inGroup?type=in_group&feedId=12003755">
                    Feedback about the Portal - Yammer
                  </StyledLink>
                </li>
              </StyledList>
            </div>
          </section>
        </StyledFlex>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
