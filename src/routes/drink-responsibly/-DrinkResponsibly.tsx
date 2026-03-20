import styled from '@emotion/styled';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useCallback, useState } from 'react';

import LayoutPanel from '@/components/LayoutPanel';
import Space from '@/components/Space';
import { BLACK } from '@/styles/colors';

type DrinkEntry = {
  id: number;
  name: string;
  abv: string;
  ml: string;
};

let nextId = 1;

const calcAlcoholMl = (abv: string, ml: string): number => {
  const a = parseFloat(abv);
  const m = parseFloat(ml);
  if (isNaN(a) || isNaN(m)) return 0;
  return (a / 100) * m;
};

const DrinkResponsibly = () => {
  const [entries, setEntries] = useState<DrinkEntry[]>([]);

  const addEntry = useCallback(() => {
    setEntries((prev) => [...prev, { id: nextId++, name: '', abv: '', ml: '' }]);
  }, []);

  const removeEntry = useCallback((id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateEntry = useCallback(
    (id: number, field: keyof Omit<DrinkEntry, 'id'>, value: string) => {
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
    },
    [],
  );

  const totalAlcoholMl = entries.reduce((sum, e) => sum + calcAlcoholMl(e.abv, e.ml), 0);
  const totalDrinkMl = entries.reduce((sum, e) => sum + (parseFloat(e.ml) || 0), 0);

  return (
    <LayoutPanel>
      <Space h={32} />
      <Header>
        <Title>{`> DRINK RESPONSIBLY!`}</Title>
        <AddButton onClick={addEntry}>
          <IconPlus size={16} />
          {' ADD DRINK'}
        </AddButton>
      </Header>
      <Space h={16} />
      <Table>
        <thead>
          <Tr>
            <Th $flex={3}>BOTTLE</Th>
            <Th $flex={1}>ABV %</Th>
            <Th $flex={1}>ML</Th>
            <Th $flex={1}>ALCOHOL (ML)</Th>
            <Th $flex={0}></Th>
          </Tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <Tr key={entry.id}>
              <Td $flex={3}>
                <Input
                  type="text"
                  placeholder="Bottle name"
                  value={entry.name}
                  onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                />
              </Td>
              <Td $flex={1}>
                <Input
                  type="text"
                  placeholder="0.0"
                  value={entry.abv}
                  onChange={(e) => updateEntry(entry.id, 'abv', e.target.value)}
                />
              </Td>
              <Td $flex={1}>
                <Input
                  type="text"
                  placeholder="0"
                  value={entry.ml}
                  onChange={(e) => updateEntry(entry.id, 'ml', e.target.value)}
                />
              </Td>
              <Td $flex={1}>
                <AlcoholValue>{calcAlcoholMl(entry.abv, entry.ml).toFixed(1)}</AlcoholValue>
              </Td>
              <Td $flex={0}>
                <DeleteButton onClick={() => removeEntry(entry.id)}>
                  <IconTrash size={16} />
                </DeleteButton>
              </Td>
            </Tr>
          ))}
          {entries.length === 0 && (
            <Tr>
              <EmptyTd colSpan={5}>NO ALOCHOL YET</EmptyTd>
            </Tr>
          )}
        </tbody>
        <tfoot>
          <DividerTr>
            <td colSpan={5}>
              <Divider />
            </td>
          </DividerTr>
          <Tr>
            <Th $flex={3}>TOTAL</Th>
            <Th $flex={1}></Th>
            <Th $flex={1}>{totalDrinkMl.toFixed(0)} ml</Th>
            <Th $flex={1}>{totalAlcoholMl.toFixed(1)} ml</Th>
            <Th $flex={0}></Th>
          </Tr>
        </tfoot>
      </Table>
      <Space h={32} />
    </LayoutPanel>
  );
};

export default DrinkResponsibly;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Tr = styled.tr``;

const colWidth: Record<number, string> = {
  3: '50%',
  1: '15%',
  0: '32px',
};

const Th = styled.th<{ $flex: number }>`
  width: ${({ $flex }) => colWidth[$flex]};
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  padding: 8px 4px;
`;

const Td = styled.td<{ $flex: number }>`
  width: ${({ $flex }) => colWidth[$flex]};
  padding: 4px;
`;

const EmptyTd = styled.td`
  flex: 1;
  text-align: center;
  font-size: 14px;
  padding: 16px 0;
  color: ${BLACK};
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 14px;
  box-sizing: border-box;
`;

const AlcoholValue = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 4px;
`;

const DividerTr = styled.tr``;

const Divider = styled.div`
  height: 2px;
  background-color: ${BLACK};
  margin: 8px 0;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${BLACK};
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;
