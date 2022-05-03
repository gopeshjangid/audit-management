/** @jsx jsx */
import { Fragment } from 'react';
import { jsx } from '@emotion/core';
import { PopupSelect } from '@atlaskit/select';

const options = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const onChange = console.log;
const defaults = {
  options,
  placeholder: 'Choose a City',
  onChange,
};

const PopupSelectExample = (props) => (
  <Fragment>
    <div css={{ display: 'flex', justifyContent: 'space-between' }}>
      <PopupSelect
        {...defaults}
        value={options[2]}
        target={({ isOpen, ...triggerProps }) => {
           return  <button {...triggerProps}>Target</button>;
        }
         
        }
      />
     
    </div>
   
  </Fragment>
);

export default PopupSelectExample;