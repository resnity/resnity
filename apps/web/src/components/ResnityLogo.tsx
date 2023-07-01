import 'twin.macro';

type ResnityLogoProps = React.ComponentPropsWithoutRef<'img'>;

const ResnityLogo = (props: ResnityLogoProps) => {
  return (
    <img
      tw="h-full w-full"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Resnity"
      {...props}
    />
  );
};

export { ResnityLogo };
