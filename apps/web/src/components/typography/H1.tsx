import styled from '@emotion/styled';
import tw from 'twin.macro';

import BaseText from './BaseText';

const H1 = styled(BaseText)(() => [tw`text-3xl font-extrabold`]);

export default H1;
