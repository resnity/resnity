import styled from '@emotion/styled';
import tw from 'twin.macro';

import BaseText from './BaseText';

const ButtonText = styled(BaseText)(() => [tw`text-sm font-medium uppercase`]);

export default ButtonText;
