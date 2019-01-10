import React from 'react';

import Content from './Content';
import Fonts from '../utils/Fonts';

const ErrorScreen = () => {
  return (
    <Content>
      <Fonts.H1>Oops, something went wrong</Fonts.H1>
      <Fonts.P>
        Please try again. If things still don't work please contact us at contact.meetsta@gmail.com
      </Fonts.P>
    </Content>
  );
};

export default ErrorScreen;