import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  expect(incrementButton.length).toBe(1);
});

test('renders decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  expect(decrementButton.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('the counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('the counter increments by 1 upon a click of increment button', () => {
  const wrapper = setup(null, { counter: 6 });
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(7);
});

test('the counter decrements by 1 upon a click of decrement button', () => {
  const wrapper = setup(null, { counter: 4 });
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(3);
});

test('the counter cannot go below 0', () => {
  const wrapper = setup(null, { counter: 0 });
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
});

test('the error message is not displayed when not needed', () => {
  const wrapper = setup(null, { error: false });
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});

test('when the counter is 0 and decrement button is clicked, renders error message display', () => {
  const wrapper = setup(null, { counter: 0 });
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
  expect(errorMessage.text()).toBe("The counter can't go below zero");
});

test('when the error message is displayed and the increment button is clicked, clear the error message', () => {
  const wrapper = setup(null, { counter: 0 });
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
});
