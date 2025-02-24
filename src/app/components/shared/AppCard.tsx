'use client'

// Imports
import Card from '@mui/material/Card'
import { AppState } from '@/store/store';
import { useSelector } from '@/store/hooks';

type Props = {
  children: JSX.Element | JSX.Element[];
  maxHeight?: string 
};

const AppCard = ({ children, maxHeight }: Props) => {
  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <Card
      sx={{ display: 'flex', p: 0, maxHeight: maxHeight }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default AppCard;
