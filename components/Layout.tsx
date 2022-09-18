import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Theme, useTheme } from '../theme/ThemeContext';
import Sidebar from './Sidebar/Sidebar';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { theme } = useTheme();

  const childrenComponentClassWrapper = classNames(
    'bg-slate-200 flex-1 p-4 text-white duration-300',
    {
      ['ml-72']: theme === Theme.Toggled,
      ['ml-12']: theme === Theme.NotToggled,
    }
  );

  return (
    <div className="min-h-screen flex flex-row justify-start">
      <Sidebar />
      <div className={childrenComponentClassWrapper}>{children}</div>
    </div>
  );
};

export default Layout;
