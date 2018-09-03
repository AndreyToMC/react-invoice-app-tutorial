import * as React from 'react';

// Импорт необходимых элементов из Material Ui
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

// Прописываем классы стилей для нашего компонента,
// особое внимание стоит уделить createStyles - вспомогательная функция для правил стиля (С), необходима для работы под тайпскриптом
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
// Прописываем интерфейсы для класса
// Вполне возможно Тайпскрипт ругается на то, что интерфейсы должен быть с заглавной буквы i, ну пусть будет так...
// Так же наследуем интерфейс стилей от material Ui
interface InterfaceMySelect extends WithStyles<typeof styles> {
  name?: string,
  values?: [],
  selected?: number,
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  placeholder?: string,
  id?: string,
  label?: string,
  errorMsg?: string,
}
interface InterfaceProduct {
  id?: number,
  name?: string,
  price?: string,
}
// Создание тупого функционального компонента, потому что нам не нужны state и жизненые циклы компонента реат.

const MySelect = (props: InterfaceMySelect) => {
  const { classes, name, values, selected, onChange, placeholder, id, label, errorMsg } = props;
  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id} >{label}</InputLabel>
        <Select
          error={errorMsg && errorMsg.length > 0}
          value={selected || ''}
          onChange={onChange}
          displayEmpty
          input={<Input name={name} />}
          autoWidth
        >
          <MenuItem value='' disabled>
            {placeholder}
          </MenuItem>
          {values &&
            values.map((elem: InterfaceProduct) => {
              return (
                <MenuItem key={elem.id} value={elem.id}>{elem.name}</MenuItem>
              )
            })
          }
          })}
        </Select>
        <FormHelperText error={errorMsg && errorMsg.length > 0} >{errorMsg}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(MySelect);
