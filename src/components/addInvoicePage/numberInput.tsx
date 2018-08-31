import * as React from 'react';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';

const styles = (theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

interface InterfaceNumberInput extends WithStyles<typeof styles> {
  value?: number,
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  name?: string,
  id?: string,
  label?: string,
  disabled?: boolean,
  errorMsg?: string,
}

const NumberInput = (props: InterfaceNumberInput) => {
  const { classes, value, name, label, disabled, errorMsg, onChange } = props;
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='names'>{label}</InputLabel>
        <Input
          error={errorMsg && errorMsg.length > 0}
          disabled={disabled}
          type='number'
          name={name}
          onChange={onChange}
          value={value}
        />
        <FormHelperText error={errorMsg && errorMsg.length > 0} >{errorMsg}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(NumberInput);
