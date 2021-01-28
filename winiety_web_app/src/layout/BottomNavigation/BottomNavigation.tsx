import React, { ReactElement } from 'react';
import { useStoreState } from 'store';
import BottomPoliceNavigation from './BottomPoliceNavigation';
import BottomUserNavigation from './BottomUserNavigation';

interface Props {
  className?: string;
}

const BottomNavigationComp = (props: Props): ReactElement => {
  const { className } = props;

  const role = useStoreState((state) => state.userSession.role);

  const bottomMenu = () => {
    if (role.includes('police')) {
      return <BottomPoliceNavigation className={className} />;
    }
    if (role.includes('user')) {
      return <BottomUserNavigation className={className} />;
    }
    return <></>;
  };

  return <>{bottomMenu()}</>;
};

export default BottomNavigationComp;
