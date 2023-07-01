import styled from '@emotion/styled';
import tw, { TwStyle } from 'twin.macro';

type LineColor = keyof typeof lineColorToClasses;

type DividerProps = {
  lineColor?: LineColor;
  text?: string;
};

const Divider = ({ lineColor, text, ...props }: DividerProps) => {
  return (
    <Container {...props}>
      <LineContainer aria-hidden="true">
        <Line lineColor={lineColor} />
      </LineContainer>
      {text && (
        <TextContainer>
          <Text>{text}</Text>
        </TextContainer>
      )}
    </Container>
  );
};

export default Divider;

const Container = styled('div')(() => [tw`relative`]);

const LineContainer = styled('div')(() => [
  tw`absolute inset-0 flex items-center`,
]);

const Line = styled('div')<{ lineColor?: LineColor }>(
  ({ lineColor = 'gray-300' }) => [
    tw`w-full border-t`,
    lineColorToClasses[lineColor],
  ],
);

const TextContainer = styled('div')(() => [tw`relative flex justify-center`]);

const Text = styled('span')(() => [tw`bg-white px-2 text-sm text-gray-500`]);

const lineColorToClasses = {
  'gray-100': tw`border-gray-100`,
  'gray-200': tw`border-gray-200`,
  'gray-300': tw`border-gray-300`,
} satisfies Record<string, TwStyle>;
