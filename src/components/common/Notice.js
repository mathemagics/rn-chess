import React from 'react';
import { Text } from 'react-native';
import { CardSection } from './';

const Notice = ({ notice }) => {
    return (
       <CardSection>
          <Text>
            {notice}
          </Text>
       </CardSection>
     );
};

export { Notice };
