import navReducer, {
  NavState,
  increment
} from './navSlice';

describe('counter reducer', () => {
  const initialState: NavState = {
      id:"navState",
      links: [
        { title: "React", href: "https://reactjs.org/" },
        { title: "Redux", href: "https://redux.js.org/" },
        { title: "Redux Tookit", href: "https://redux-toolkit.js.org/" },
        { title: "React Redux", href: "https://react-redux.js.org/" },
      ]
  };

  it('should handle initialState', () => {
    const actual = navReducer(initialState, increment());
    expect(actual.id).toEqual("navState");
    expect(actual.links[0].title).toEqual("React");
  });

  it('should handle increment', () => {
    const actual = navReducer(initialState, increment());
    expect(actual.links[3].href).toEqual("https://react-redux.js.org/");
  });
});
