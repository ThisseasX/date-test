const {
  startOfDay,
  toDate,
  // fromUnixTime,
  getTime,
  // getUnixTime,
} = require('date-fns/fp');

const { flow, toString, toNumber, over } = require('lodash/fp');

//// UTILS //////////////////////////////////////

const debug = label => v => {
  console.log(label.padEnd('35', ' '), v);
  return v;
};

const removeTimezoneOffset = date =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000);

const toUTCString = date => date.toUTCString();

// MAIN LOGIC //////////////////////////////////////

const formatForBE = date =>
  flow(
    startOfDay, //
    getTime,
    toString,
  )(date);

const formatForBEWithoutTimezone = date =>
  flow(
    startOfDay, //
    removeTimezoneOffset,
    getTime,
    toString,
  )(date);

const parseFromBE = dateString =>
  flow(
    toNumber, //
    toDate,
  )(dateString);

//// TESTS //////////////////////////////////////

// Test formatForBE
flow(
  formatForBE, //
  debug('formatForBE'),
)(new Date());

// Test formatForBEWithoutTimezone
flow(
  formatForBEWithoutTimezone,
  debug('formatForBE w/o timezone'),
)(new Date());

// Test parseFromBE
flow(
  formatForBE,
  parseFromBE,
  over([
    flow(
      toUTCString, //
      debug('parseFromBE UTC String'),
    ),

    flow(
      removeTimezoneOffset,
      toUTCString,
      debug('parseFromBE UTC String w/o timezone'),
    ),

    flow(
      toString, //
      debug('parseFromBE String'),
    ),

    flow(
      removeTimezoneOffset,
      toString,
      debug('parseFromBE String w/o timezone'),
    ),
  ]),
)(new Date());
