import React, { ReactElement } from 'react';

interface ProfileTabProps {
  className?: string;
}

const ProfileTab = (props: ProfileTabProps): ReactElement => {
  const { className } = props;
  return <div className={className} />;
};

export default ProfileTab;
