import * as React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import { TimeIcon } from '../_shared/icons/TimeIcon';
import { DateTimePickerView } from './DateTimePicker';
import { DateRangeIcon } from '../_shared/icons/DateRangeIcon';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const viewToTabIndex = (openView: DateTimePickerView) => {
  if (openView === 'date' || openView === 'year') {
    return 'date';
  }

  return 'time';
};

const tabIndexToView = (tab: DateTimePickerView) => {
  if (tab === 'date') {
    return 'date';
  }

  return 'hours';
};

export interface DateTimePickerTabsProps {
  view: DateTimePickerView;
  dateTooltipProps?: Partial<TooltipProps>;
  timeTooltipProps?: Partial<TooltipProps>;
  onChange: (view: DateTimePickerView) => void;
  dateRangeIcon?: React.ReactNode;
  timeIcon?: React.ReactNode;
}

export const useStyles = makeStyles(
  theme => {
    // prettier-ignore
    const tabsBackground = theme.palette.type === 'light'
      ? theme.palette.primary.main
      : theme.palette.background.default;

    return {
      tabs: {
        color: theme.palette.getContrastText(tabsBackground),
        backgroundColor: tabsBackground,
      },
    };
  },
  { name: 'MuiPickerDTTabs' }
);

export const DateTimePickerTabs: React.SFC<DateTimePickerTabsProps> = ({
  view,
  onChange,
  dateRangeIcon,
  timeIcon,
  dateTooltipProps,
  timeTooltipProps,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  const handleChange = (e: React.ChangeEvent<{}>, value: DateTimePickerView) => {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return (
    <Paper>
      <Tabs
        variant="fullWidth"
        value={viewToTabIndex(view)}
        onChange={handleChange}
        className={classes.tabs}
        indicatorColor={indicatorColor}
      >
        <Tooltip title="Pick date" {...dateTooltipProps}>
          <Tab value="date" icon={<>{dateRangeIcon}</>} />
        </Tooltip>
        <Tooltip title="Pick time" {...timeTooltipProps}>
          <Tab value="time" icon={<>{timeIcon}</>} />
        </Tooltip>
      </Tabs>
    </Paper>
  );
};

DateTimePickerTabs.defaultProps = {
  dateRangeIcon: <DateRangeIcon />,
  timeIcon: <TimeIcon />,
};

export default DateTimePickerTabs;
