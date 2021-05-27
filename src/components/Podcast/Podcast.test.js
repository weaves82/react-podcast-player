import { render, screen } from "@testing-library/react"
import * as hooks from "../../services/useFetch";
import Podcast from './Podcast'

// jest.mock('../../services/useFetch', () => () => {
  // return {
  //   data:{
  //     items: [],
  //     title: "Code Switch",
  //   },
  //   loading:false,
  //   error:null}
// });


// import * as hooks from 'module_name';

// it('a test', () => {
//     jest.spyOn(hooks, 'useClientRect').mockImplementation(() => ([100, 200, jest.fn()]));
//     //rest of the test
// });

test("Podcast component renders correctly", () => {
  jest.spyOn(hooks, 'default').mockImplementation(() => {
    return {
      data:{
        items: [],
        title: "Code Switch",
      },
      loading:false,
      error:null}
  });
  render(<Podcast />)
  const textElement = screen.getByText(/Code Switch Podcast/i);
  expect(textElement).toBeInTheDocument();
})

test("Podcast component renders loading message by default", () => {
  jest.spyOn(hooks, 'default').mockImplementation(() => {
    return {
      data:{},
      loading:true,
      error:null}
  });
  render(<Podcast />)
  const textElement = screen.getByText(/loading/i);
  expect(textElement).toBeInTheDocument();

})