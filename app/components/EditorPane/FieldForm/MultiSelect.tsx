import React from 'react';
import { MyInput } from '../style';

import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';

const MultiSelect = (props) => {
  const { label, value, onUpdate , placeholder, className, tags} = props
  const style = {
    control: (provided, state) =>({...provided,
    border: 'none'
    }),
    valueContainer: (provided, state) =>({...provided,
    padding:0
    })
  }
  const submitHander = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();

        const tags = newValue.map(t => t.value)
        onUpdate(tags)

}

    return (
      <CreatableSelect
      style={style}
        name={label}
        placeholder="Add tags..."
        isMulti
        isClearable={false}
        onChange={submitHander}
        options={tags} // [{label: "git", value: "git"}]
      />
  )
}

export default MultiSelect;
