import 'twin.macro';

import { ReactComponent as GoogleLogoIcon } from '../../assets/icons/google-logo.svg';
import OutlinedButton from './OutlinedButton';

type GoogleSignInButtonProps = {
  onClick: () => void;
};

const GoogleSignInButton = ({ onClick }: GoogleSignInButtonProps) => {
  return (
    <OutlinedButton fullWidth onClick={onClick}>
      <GoogleLogoIcon tw="w-5 h-5" />
      Sign in with Google
    </OutlinedButton>
  );
};

export default GoogleSignInButton;
