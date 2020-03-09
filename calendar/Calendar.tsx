import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import moment from 'moment';
// components
import Day from './Day';
// types
import {getWeeks, Week_Type, Month_Type, Day_Type} from './utils/data';
import {LOCALE_TYPE} from './utils/locale';
import {Style} from './index';

interface Props {
  item: Month_Type;
  locale: LOCALE_TYPE;
  onPress: (date: string) => void;
  startDate: string | null;
  endDate: string | null;
  style?: Style;
}

export default class Calendar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    const newId = nextProps.item.id;
    if (
      nextProps.startDate &&
      moment(nextProps.startDate).format('YYYY-MM') == newId
    )
      return true;

    if (
      nextProps.endDate &&
      moment(nextProps.endDate).format('YYYY-MM') == newId
    )
      return true;

    if (
      this.props.startDate &&
      moment(this.props.startDate).format('YYYY-MM') == newId
    )
      return true;

    if (
      this.props.endDate &&
      moment(this.props.endDate).format('YYYY-MM') == newId
    )
      return true;

    if (
      nextProps.startDate &&
      nextProps.endDate &&
      moment(nextProps.startDate).format('YYYY-MM') < newId &&
      moment(nextProps.endDate).format('YYYY-MM') > newId
    )
      return true;

    if (
      this.props.endDate &&
      this.props.startDate &&
      moment(this.props.startDate).format('YYYY-MM') < newId &&
      moment(this.props.endDate).format('YYYY-MM') > newId
    )
      return true;

    return false;
  }

  render() {
    const {
      item: {id, year, month},
      startDate,
      endDate,
      locale,
      onPress,
      style,
    } = this.props;
    const weeks: Week_Type[] = getWeeks(id, startDate, endDate);
    const is6Weeks = weeks.length > 5;
    return (
      <View style={[styles.container, style?.monthContainer]}>
        <View style={styles.monthNameContainer}>
          <Text style={[styles.monthName, style?.monthName]}>
            {year} {locale.monthNames[month - 1]}
          </Text>
        </View>
        <View style={styles.dayNamesContainer}>
          {locale.dayNames.map((day: string, i: number) => (
            <View key={i} style={styles.dayNameContainer}>
              <Text style={[styles.dayName, style?.dayName]}>{day}</Text>
            </View>
          ))}
        </View>
        <View>
          {weeks.map((week: Week_Type, i: number) => (
            <View style={styles.dayContainer} key={i}>
              {week.map((day: Day_Type, j: number) => (
                <Day
                  day={day}
                  key={j}
                  locale={locale}
                  onPress={onPress}
                  containerStyle={{height: is6Weeks ? 45 : 50}}
                  isToday={day.date === moment().format('YYYY-MM-DD')}
                  isHoliday={j === 0 || j === 6}
                  style={style}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  monthNameContainer: {
    paddingLeft: 20,
  },
  monthName: {
    fontSize: 16,
  },
  dayNamesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  dayName: {
    fontSize: 15,
    color: '#bababe',
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
