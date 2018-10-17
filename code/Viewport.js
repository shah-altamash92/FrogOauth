import React from 'react';
import { Dimensions } from "react-native";
var {width, height} = Dimensions.get('window');

var units = {
  vw: Dimensions.get('window').width/100
, vh: height/100
};

units.vmin = Math.min(units.vw, units.vh);
units.vmax = Math.max(units.vw, units.vh);

export default units;