import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import Media from '../utils/Media';

const propTypes = {
  errMsg: PropTypes.string,
  isValid: PropTypes.bool,
  isPassword: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  marginBottom8px: PropTypes.bool,
  noMargin: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

const defaultProps = {
  errMsg: '',
  isValid: null,
  isPassword: false,
  label: '',
  onBlur: null,
  marginBottom8px: false,
  noMargin: false,
  placeholder: '',
};

const InputText = ({
  errMsg,
  label,
  isValid,
  isPassword,
  onChange,
  onBlur,
  marginBottom8px,
  noMargin,
  placeholder,
  value,
}) => {
  const errLabel = errMsg ? <ErrLabel>{errMsg}</ErrLabel> : null;

  const hasError = errMsg.length > 0;

  const labelDiv = label ? <Label>{label}</Label> : null;

  return (
    <Container>
      {labelDiv}
      <Input
        hasError={hasError}
        isValid={isValid}
        onChange={onChange}
        onBlur={onBlur}
        marginBottom8px={marginBottom8px}
        noMargin={noMargin}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
      />
      {errLabel}
    </Container>
  );
};

const Area = ({ errMsg, label, isValid, onChange, onBlur, noMargin, placeholder, value }) => {
  const errLabel = errMsg ? <ErrLabel>{errMsg}</ErrLabel> : null;

  const hasError = errMsg.length > 0;

  return (
    <Container>
      <Label>{label}</Label>
      <InputArea
        hasError={hasError}
        isValid={isValid}
        onChange={onChange}
        onBlur={onBlur}
        noMargin={noMargin}
        type="text"
        placeholder={placeholder}
        value={value}
        rows={4}
      />
      {errLabel}
    </Container>
  );
};

Area.propTypes = propTypes;
Area.defaultProps = defaultProps;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  font-size: 14px;

  ${Media.tablet} {
    width: auto;
    margin: 0;
  }
`;

const Label = styled.label`
  color: ${Colors.primary.darkBlue};
  opacity: 0.8;
  margin-bottom: 8px;
  display: inline-block;
  font-size: 20px;
`;

const Input = styled.input`
  padding: 1em 1em;
  border-radius: 3px;
  border: 1px solid ${Colors.greys.quaternary};
  font-size: 20px;
  font-family: ${Fonts.family.body};
  color: ${Colors.primary.darkBlue};

  margin-bottom: ${props => (props.hasError || props.marginBottom8px ? '8px' : '16px')};
  border-color: ${props => (props.hasError ? Colors.error.primary : '')};
  border-color: ${props => (props.isValid ? Colors.primary.green : '')};
  margin-bottom: ${props => (props.noMargin ? '0' : '')};

  ::placeholder {
    color: ${Colors.greys.tertiary};
  }

  :focus {
    // border: 1px solid ${Colors.primary.green};
    outline: none;
  }
`;

const InputArea = styled.textarea`
  padding: 0.5em 0.5em;
  border-radius: 3px;
  border: 1px solid ${Colors.greys.light};
  font-size: 16px;
  font-family: ${Fonts.family.body};

  color: ${Colors.greys.primary};

  margin-bottom: ${props => (props.hasError ? '8px' : '16px')};
  border-color: ${props => (props.hasError ? Colors.error.primary : '')};
  border-color: ${props => (props.isValid ? Colors.primary.green : '')};

  ::placeholder {
    color: ${Colors.greys.tertiary};
  }

  :focus {
    border: 1px solid ${Colors.primary.green};
    outline: none;
  }
`;

const ErrLabel = styled(Label)`
  color: ${Colors.error.primary};
  margin-bottom: 16px;
  font-weight: bold;
  opacity: 1;
`;

InputText.Area = Area;
InputText.ErrLabel = ErrLabel;

InputText.propTypes = propTypes;
InputText.defaultProps = defaultProps;

export default InputText;
