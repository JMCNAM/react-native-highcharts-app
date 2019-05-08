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


const areaData = require('../data/zonalPrices.json');

Enzyme.configure({ adapter: new Adapter() });
var data = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

describe('AreaChart component', () => {

  it('should have a single <View> component.', () => {
    const wrapper = shallow(<View/>);
    expect(wrapper.find('View').length).toBe(1);
  })
})
