import { Box, Button, Stack, Typography } from '@mui/material';

import { SquarePaper } from '../../../components/SquarePaper';

type MenuOverviewCardProps = {
  name: string;
  createdAt: Date;
};

export const MenuOverviewCard = ({
  name,
  createdAt,
}: MenuOverviewCardProps) => {
  return (
    <SquarePaper>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          mx: 'auto',
          width: '100%',
          height: '100%',
        }}
      >
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {name}
          </Typography>
          <Typography variant="caption">{createdAt.getTime()}</Typography>
        </Stack>
        <Box sx={{ mx: 'auto', width: '75%' }}>
          <Button fullWidth variant="outlined">
            Edit
          </Button>
        </Box>
      </Stack>
    </SquarePaper>
  );
};
