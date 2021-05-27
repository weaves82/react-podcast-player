import moxios from "moxios";
import { renderHook } from "@testing-library/react-hooks";
import useFetch from './useFetch';

describe('test hook works', () => {
  //need to moxios the get
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('sets data after axios call', async () => {

    const { result, waitForNextUpdate } = renderHook(() => useFetch('http://mock'));

    const responseData = {
      items: [{
        attachments: [{
          duration_in_seconds:1234
        }],
        date_published: 123,
        title: "A podcast calledTest"
      }],
      title: "This is a test podcast channel",
    }
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: responseData,
      });
    });

    expect(result.current.loading).toBeTruthy();


    await waitForNextUpdate();

    expect(result.current.data).toBe(responseData);
    expect(result.current.loading).toBeFalsy()

  })
})

test('throws an error correctly', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetch('http://mock'));
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 404,
      response: '',
    });
  });

  expect(result.current.error).toBe(null);
  expect(result.current.loading).toBeTruthy();

  await waitForNextUpdate();

  expect(result.current.error).toBeTruthy();
  expect(result.current.loading).toBeFalsy();

})