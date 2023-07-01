import { Grid, theme } from 'antd';
import { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren;

export const Container = ({ children }: ContainerProps) => {
  const {
    token: { screenLG },
  } = theme.useToken();
  const { xs } = Grid.useBreakpoint();

  const padding = xs ? '0 16px' : '0 24px';

  return (
    <div
      style={{
        maxWidth: screenLG,
        margin: '0 auto',
        padding,
      }}
    >
      {children}
    </div>
  );
};
