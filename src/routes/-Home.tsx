import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

import BottleCarousel from '@/components/BottleCarousel';
import LayoutPanel from '@/components/LayoutPanel';
import Space from '@/components/Space';
import { BLACK } from '@/styles/colors';

import type { BottleData } from './print/bottle/-types';

const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
`;

const MenuLink = styled(Link)<{ $depth: number }>`
  color: ${BLACK};
  text-decoration: none;
  cursor: pointer;
  margin-left: ${(props) => (props.$depth - 1) * 24}px;
`;

const MenuText = styled.div<{ $depth: number }>`
  color: ${BLACK};
  margin-left: ${(props) => (props.$depth - 1) * 24}px;
`;

const MenuDottedLine = styled.div`
  color: ${BLACK};
  height: 1px;
  border-bottom: 2px ${BLACK} dotted;
  flex: 1;
`;

type MenuItem = {
  id: string;
  name: string;
  redirect?: boolean;
  subMenu?: MenuItem[];
};

const MENU_LIST: MenuItem[] = [
  {
    id: '/bottle-of-the-day',
    name: 'BOTTLE OF THE DAY',
    redirect: true,
  },
  {
    id: '/bottle-of-the-day',
    name: 'BOTTLE OF THE DAY',
    redirect: true,
  },
  {
    id: '/print',
    name: 'PRINT LABELS',
    subMenu: [
      {
        id: '/bottle',
        name: 'BOTTLE',
        subMenu: [
          {
            id: '/new',
            name: 'NEW BOTTLES',
            redirect: true,
          },
          {
            id: '/existing',
            name: 'EXISTING BOTTLES',
            redirect: true,
          },
        ],
      },
      {
        id: '/box',
        name: 'BOX',
        redirect: true,
      },
    ],
  },
];

const renderMenu = (items: MenuItem[], parentPath: string, depth: number) => {
  return items.map((item) => {
    const path = parentPath + item.id;
    return (
      <Fragment key={item.id}>
        {item.redirect ? (
          <MenuLink $depth={depth} to={path}>
            {`> ${item.name}`}
            <MenuDottedLine />
            {'*'}
          </MenuLink>
        ) : (
          <MenuText $depth={depth}>
            {`> ${item.name}`}
            <MenuDottedLine />
            {'*'}
          </MenuText>
        )}
        {item.subMenu && renderMenu(item.subMenu, path, depth + 1)}
      </Fragment>
    );
  });
};

const Home = () => {
  const now = new Date().toISOString().slice(2, 10);
  const [bottles, setBottles] = useState<BottleData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}bottles.json`)
      .then((res) => res.json())
      .then((data: BottleData[]) => setBottles(data));
  }, []);

  return (
    <LayoutPanel>
      <Space h={32} />
      <MenuContainer>{renderMenu(MENU_LIST, '', 1)}</MenuContainer>
      <Space h={32} />
      {bottles.length > 0 && <BottleCarousel bottles={bottles} labeledAt={now} />}
      <Space h={16} />
    </LayoutPanel>
  );
};

export default Home;
