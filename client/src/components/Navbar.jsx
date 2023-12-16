import React from 'react';
import Badge from '@material-ui/core/Badge';
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { mobile } from "../responsive";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Userlogout } from '../redux/apiCalls';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration-line: underline;
  color: #483D8B;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigte = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Userlogout(dispatch);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder='Search' />
              <Search style={{ color: "gray", fontSize: "16px" }} />
            </SearchContainer>
          </Left>
          <Center><Logo>LAMA.</Logo></Center>
          <Right>
            {user ? (
              <>
                <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                <Link to="/cart">
                  <MenuItem>
                    <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                      <ShoppingCartOutlined />
                    </Badge>
                  </MenuItem>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register"><MenuItem>REGISTER</MenuItem></Link>
                <Link to="/login"><MenuItem>SIGN IN</MenuItem></Link>
                <Link to="/cart">
                  <MenuItem>
                    <Badge badgeContent={quantity} color="primary" overlap="rectangular">
                      <ShoppingCartOutlined />
                    </Badge>
                  </MenuItem>
                </Link>
              </>
            )}
          </Right>
        </Wrapper>
      </Container>
    </>
  )
}

export default Navbar