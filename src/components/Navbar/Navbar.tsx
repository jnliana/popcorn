import { Logo } from '../Logo/Logo';

type TNavBarProps = {
  children: React.ReactNode;
};

export const NavBar = ({ children }: TNavBarProps) => {
  return (
    <nav className='bg-primary grid grid-cols-3 items-center h-20 px-8 rounded-lg'>
      <Logo />
      {children}
    </nav>
  );
};
