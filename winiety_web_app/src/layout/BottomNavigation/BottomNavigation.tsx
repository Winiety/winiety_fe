import React, { ReactElement } from 'react';
import { useStoreState } from 'store';
import BottomAnalystNavigation from './BottomAnalystNavigation';
import BottomCorrectorNavigation from './BottomCorrectorNavigation';
import BottomPoliceNavigation from './BottomPoliceNavigation';
import BottomUserNavigation from './BottomUserNavigation';

interface Props {
  className?: string;
}

const BottomNavigationComp = (props: Props): ReactElement => {
  const { className } = props;

  const role = useStoreState((state) => state.userSession.role);

  if (role.includes('analyst'))
    return <BottomAnalystNavigation className={className} />;

  if (role.includes('police'))
    return <BottomPoliceNavigation className={className} />;

  if (role.includes('corrector'))
    return <BottomCorrectorNavigation className={className} />;

  if (role.includes('user'))
    return <BottomUserNavigation className={className} />;

  return <></>;
};

export default BottomNavigationComp;
