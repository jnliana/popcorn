import { Logo } from '../Logo/Logo';

export const NavBar = ({ children }: any) => {
  return (
    <nav className='bg-primary grid grid-cols-3 items-center h-20 px-8 rounded-lg'>
      <Logo />
      {children}
    </nav>
  );
};
