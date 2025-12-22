import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";
import LayoutPanel from "../components/LayoutPanel";
import Space from "../components/Space";
import { BLACK } from "../styles/colors";

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
`;

const Menu = styled.div`
  color: ${BLACK};
`;

const SubMenu = styled(Link)`
  color: ${BLACK};
  text-decoration: none;
  cursor: pointer;
  margin-left: 24px;
`;

const MENU_LIST = [
  {
    id: "/print",
    name: "PRINT LABELS",
    subMenu: [
      {
        id: "/bottle",
        name: "BOTTLE",
      },
      {
        id: "/box",
        name: "BOX",
      },
    ],
  },
];

const Home = () => {
  return (
    <LayoutPanel>
      <Space h={32} />
      <MenuContainer>
        {MENU_LIST.map((menu) => (
          <>
            <Menu id={menu.id}>{`> ${menu.name}`}</Menu>
            {menu.subMenu.map((subMenu) => (
              <SubMenu id={subMenu.id} to={menu.id + subMenu.id}>
                {`> ${subMenu.name}`}
              </SubMenu>
            ))}
          </>
        ))}
      </MenuContainer>
      <Space h={32} />
    </LayoutPanel>
  );
};

export default Home;
