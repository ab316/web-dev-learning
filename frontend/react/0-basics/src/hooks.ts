import React, {useState} from 'react';

export const useInput = (
  initialValue: string,
): [{value: string; onChange: React.ChangeEventHandler<HTMLInputElement>}, () => void] => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setValue(e.target.value);
  return [{value, onChange: onChange}, () => setValue(initialValue)];
};
