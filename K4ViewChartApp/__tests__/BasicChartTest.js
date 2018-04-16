import 'jsdom-global/register'; //at the top of file , even  , before importing react
import 'react-native';
import React, { Component } from 'react';
import { View } from 'react-native';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AreaChart from '../src/components/charts/AreaChart';
import {BasicChartScreen} from '../src/components/screens';
import ChartView from 'react-native-highcharts';


Enzyme.configure({ adapter: new Adapter() });

describe('BasicChartScreen component', () => {

    it('should have a single <View> component.', () => {
      const wrapper = shallow(<View/>);
      expect(wrapper.find('View').length).toBe(1);
    })
  })