import styled from '@emotion/styled';
import tw from 'twin.macro';

import BaseText from './BaseText';

const Caption = styled(BaseText)(() => [tw`text-sm font-medium`]);

export default Caption;
