import * as React from 'react';
import { BasePickerProps } from '../typings/BasePicker';
import { Picker, ToolbarComponentProps } from './Picker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps } from '../_helpers/text-field-helper';
import { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { StateHookOptions, usePickerState } from '../_shared/hooks/usePickerState';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';

export type WithKeyboardInputProps = DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export type WithPureInputProps = DateValidationProps &
  BasePickerProps &
  ExtendWrapper<PureDateInputProps>;

export interface MakePickerOptions<T extends any> {
  Input: any;
  useState: typeof usePickerState | typeof useKeyboardPickerState;
  useOptions: (props: any) => StateHookOptions;
  getCustomProps?: (props: T) => Partial<T>;
  DefaultToolbarComponent: React.ComponentType<ToolbarComponentProps>;
}

export function makePickerWithState<T extends any>({
  Input,
  useState,
  useOptions,
  getCustomProps,
  DefaultToolbarComponent,
}: MakePickerOptions<T>): React.FC<T> {
  function PickerWithState(props: T) {
    const {
      allowKeyboardControl,
      ampm,
      animateYearScrolling,
      autoOk,
      dateRangeIcon,
      dateTooltipProps,
      disableFuture,
      disablePast,
      disableToolbar,
      emptyLabel,
      format,
      forwardedRef,
      hideTabs,
      initialFocusedDate,
      invalidDateMessage,
      invalidLabel,
      labelFunc,
      leftArrowButtonProps,
      leftTooltipProps,
      leftArrowIcon,
      loadingIndicator,
      maxDate,
      maxDateMessage,
      minDate,
      minDateMessage,
      minutesStep,
      onAccept,
      onChange,
      onClose,
      onMonthChange,
      onOpen,
      onYearChange,
      openTo,
      orientation,
      renderDay,
      rightArrowButtonProps,
      rightTooltipProps,
      rightArrowIcon,
      shouldDisableDate,
      strictCompareDates,
      timeIcon,
      timeTooltipProps,
      ToolbarComponent = DefaultToolbarComponent,
      value,
      variant,
      views,
      ...other
    } = props;

    const injectedProps = getCustomProps ? getCustomProps(props) : {};
    console.debug('dateTooltipProps', dateTooltipProps);

    const options = useOptions(props);
    const { pickerProps, inputProps, wrapperProps } = useState(props as any, options);

    return (
      <Wrapper
        variant={variant}
        InputComponent={Input}
        DateInputProps={inputProps}
        {...injectedProps}
        {...wrapperProps}
        {...other}
      >
        <Picker
          {...pickerProps}
          allowKeyboardControl={allowKeyboardControl}
          ampm={ampm}
          animateYearScrolling={animateYearScrolling}
          dateRangeIcon={dateRangeIcon}
          dateTooltipProps={dateTooltipProps}
          disableFuture={disableFuture}
          disablePast={disablePast}
          disableToolbar={disableToolbar}
          hideTabs={hideTabs}
          leftArrowButtonProps={leftArrowButtonProps}
          leftTooltipProps={leftTooltipProps}
          leftArrowIcon={leftArrowIcon}
          loadingIndicator={loadingIndicator}
          maxDate={maxDate}
          minDate={minDate}
          minutesStep={minutesStep}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
          openTo={openTo}
          orientation={orientation}
          renderDay={renderDay}
          rightArrowButtonProps={rightArrowButtonProps}
          rightTooltipProps={rightTooltipProps}
          rightArrowIcon={rightArrowIcon}
          shouldDisableDate={shouldDisableDate}
          strictCompareDates={strictCompareDates}
          timeIcon={timeIcon}
          timeTooltipProps={timeTooltipProps}
          ToolbarComponent={ToolbarComponent}
          views={views}
        />
      </Wrapper>
    );
  }

  return PickerWithState;
}
