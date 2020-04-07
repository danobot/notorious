import React from 'react';
import { MyInput, CustomSelect } from '../style';

import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';
const MultiSelect = (props) => {
  const { label, value, onUpdate , placeholder, className, values, options, id} = props
  const styles = {
    control: (provided, state) =>({
      ...provided,
      border: 'none',
      borderWidth: 0,
      borderStyle: 'none',
      borderColor: 'transparent',
      boxShadow: 'none',
      backgroundColor: 'unset'
    }),
    valueContainer: (provided, state) =>({
      ...provided,
      padding: 0,
      border:  'none'
    }),
    container: (provided, state) =>({
      ...provided,
      padding: 0,
      border:  'none',
      backgroundColor: 'unset'
    }),
    menu: (provided, state) =>({
      ...provided,
      padding: 0,
      border:  'none',
      zIndex: 50
    }),
    multiValueLabel: (provided, state) =>({
      ...provided,
      padding: 0
    }),
    multiValueRemove: (provided, state) =>({
      ...provided,
      padding: '0 2px 0 2px'
    }),
    indicatorsContainer: (provided, state) =>({
      ...provided,
      visibility: 'hidden'
    })

  }
  const submitHander = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
    if (newValue) {

      const tags = newValue.map(t => t.value)
      onUpdate(tags)
    } else {
      onUpdate([])
    }

}

    return (
      // <CustomSelect>

      <CreatableSelect
      id={id}
      styles={styles}
      name={label}
      key={label}
      classNamePrefix="rs"
      placeholder="Add tags..."
        isMulti
        isClearable={false}
        value={values ? values.map(t=>({label: t,value:t})) : []}
        // value={[{label: "gfsd",value:"hi"}]}

        onChange={submitHander}
        options={options}
      />
        // </CustomSelect>
  )
}

export default MultiSelect;
