/* eslint-disable */
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, render, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

global.___loader = {
  enqueue: jest.fn(),
};

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.shallowToJson = shallowToJson;
