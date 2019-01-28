import styled from 'styled-components';
import 'typeface-roboto';

import Colors from './Colors';
import Media from './Media';

const FontFamily = {
  logo: 'LeckerliOne, sans-serif',
  header: 'Roboto, sans-serif',
  body: 'Roboto, sans-serif',
};

const FontSizes = {
  logo: '32px',
  xl: '40px',
  h1: '32px',
  h2: '24px',
  h3: '20px',
  p: '16px',
  finePrint: '12px',
};

const FontOpacity = {
  primary: 100,
  secondary: 0.8,
  tertiary: 0.54,
};

const H1 = styled.h1`
  font-size: ${FontSizes.h1};
  font-size: ${props => (props.extraLarge ? FontSizes.xl : '')};
  font-family: ${FontFamily.header};
  color: black;
  opacity: ${props => (props.isSecondary ? FontOpacity.secondary : '')};
  opacity: ${props => (props.isTertiary ? FontOpacity.tertiary : '')};
  font-weight: 600;
  text-align: ${props => (props.centered ? 'center' : '')};
  margin: ${props => (props.noMargin ? '0px' : '')};
  margin-bottom: ${props => (props.noMarginBottom ? '0px' : '')};
  margin-bottom: ${props => (props.marginBottom8px ? '8px' : '')};
`;

const H2 = styled.h2`
  font-size: ${FontSizes.h2};
  font-family: ${FontFamily.header};
  color: black;
  opacity: ${props => (props.isSecondary ? FontOpacity.secondary : '')};
  opacity: ${props => (props.isTertiary ? FontOpacity.tertiary : '')};
  font-weight: 600;
  text-align: ${props => (props.centered ? 'center' : '')};
  margin: ${props => (props.noMargin ? '0px' : '')};
  margin-bottom: ${props => (props.noMarginBottom ? '0px' : '')};
`;

const H3 = styled.h3`
  font-size: ${FontSizes.h3};
  font-family: ${FontFamily.header};
  color: black;
  opacity: ${props => (props.isSecondary ? FontOpacity.secondary : '')};
  opacity: ${props => (props.isTertiary ? FontOpacity.tertiary : '')};
  font-weight: 400;
  text-align: ${props => (props.centered ? 'center' : '')};
  margin: ${props => (props.noMargin ? '0px' : '')};
  margin-bottom: ${props => (props.noMarginBottom ? '0px' : '')};
  margin-bottom: ${props => (props.marginBottom4px ? '4px' : '')};
  margin-bottom: ${props => (props.marginBottom8px ? '8px' : '')};
  margin-top: ${props => (props.noMarginTop ? '0px' : '')};
`;

const P = styled.p`
  font-size: ${FontSizes.p};
  font-family: ${FontFamily.body};
  font-weight: 400;
  color: black;
  opacity: ${props => (props.isSecondary ? FontOpacity.secondary : '')};
  opacity: ${props => (props.isTertiary ? FontOpacity.tertiary : '')};
  ${props => (props.isTertiary ? `color: ${Colors.greys.tertiary};` : '')}
  ${props => (props.isSecondary ? `color: ${Colors.greys.secondary};` : '')}
  margin: 0;
  text-align: ${props => (props.centered ? 'center' : '')};
`;

const Label = styled.span`
  font-size: ${FontSizes.finePrint};
  font-family: ${FontFamily.body};
  font-weight: 300;
  color: black;
  opacity: ${props => (props.isSecondary ? FontOpacity.secondary : '')};
  opacity: ${props => (props.isTertiary ? FontOpacity.tertiary : '')};
`;

const Err = styled.p`
  font-size: ${FontSizes.p};
  font-family: ${FontFamily.body};
  font-weight: bold;
  color: ${Colors.error.primary};
  margin: 8px 0;
  margin: ${props => (props.noMargin ? '0px' : '')};
  text-align: ${props => (props.centered ? 'center' : '')};
`;

const A = styled.a`
  text-decoration: none;
  color: ${Colors.primary.red};
  font-weight: bold;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  text-align: ${props => (props.centered ? 'center' : '')};
`;

const Link = styled.span`
  text-decoration: none;
  color: ${Colors.primary.red};
  font-weight: bold;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  text-align: ${props => (props.centered ? 'center' : '')};
`;

const Fonts = {};
Fonts.family = FontFamily;
Fonts.sizes = FontSizes;
Fonts.opacity = FontOpacity;
Fonts.H1 = H1;
Fonts.H2 = H2;
Fonts.H3 = H3;
Fonts.P = P;
Fonts.Link = Link;
Fonts.Label = Label;
Fonts.Err = Err;
Fonts.A = A;

export default Fonts;
