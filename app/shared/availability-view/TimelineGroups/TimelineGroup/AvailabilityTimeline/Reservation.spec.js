import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

import Reservation from './Reservation';
import utils from '../utils';

function getOverlayTrigger(props) {
  const defaults = {
    end: '2016-01-01T12:00:00Z',
    name: 'Meeting',
    begin: '2016-01-01T10:00:00Z',
  };
  return shallow(<Reservation {...defaults} {...props} />);
}

function getWrapper(props) {
  return getOverlayTrigger(props).find('.reservation');
}

describe('shared/availability-view/Reservation', () => {
  it('renders a div.reservation', () => {
    const wrapper = getWrapper();
    expect(wrapper.is('div.reservation')).to.be.true;
  });

  it('renders an OverlayTrigger', () => {
    const wrapper = getOverlayTrigger();
    expect(wrapper.is(OverlayTrigger)).to.be.true;
  });

  it('renders a tooltip', () => {
    const overlayTrigger = getOverlayTrigger();
    const overlay = overlayTrigger.prop('overlay');
    expect(overlay.type).to.equal(Tooltip);
  });

  it('has correct width', () => {
    const times = {
      end: '2016-01-01T20:00:00Z',
      begin: '2016-01-01T10:00:00Z',
    };
    const expected = utils.getTimeSlotWidth({
      startTime: moment(times.begin),
      endTime: moment(times.end),
    });
    const actual = getWrapper(times).prop('style');
    expect(actual).to.deep.equal({ width: expected });
  });

  it('renders start time', () => {
    const begin = '2016-01-01T10:30:00Z';
    const element = getWrapper({ begin }).find('.start-time');
    expect(element).to.have.length(1);
    expect(element.text()).to.equal(moment(begin).format('HH:mm'));
  });

  it('renders end time', () => {
    const end = '2016-01-01T10:30:00Z';
    const element = getWrapper({ end }).find('.end-time');
    expect(element).to.have.length(1);
    expect(element.text()).to.equal(moment(end).format('HH:mm'));
  });

  it('renders name', () => {
    const name = 'Meeting GUQ';
    const element = getWrapper({ name }).find('.name');
    expect(element).to.have.length(1);
    expect(element.text()).to.equal(name);
  });
});
