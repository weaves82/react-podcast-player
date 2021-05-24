import { FavouriteContext } from "../favouriteContext";
import { PodcastContext } from "../podcastContext";
import { fireEvent, render, screen } from '@testing-library/react';
import React from "react";
import Favourites from './Favourites';

import * as fS from '../services/favouriteService';

jest.mock('../services/favouriteService');

function renderUserGreeter(favourites, dispatch, setPodcast) {
  return render(
    <PodcastContext.Provider value={{setPodcast}}>
      <FavouriteContext.Provider value={{ favourites, dispatch }}>
        <Favourites />
      </FavouriteContext.Provider>
    </PodcastContext.Provider>
  );
}
const mockDispatchFunction = jest.fn()
const mockSetPodcastFunction = jest.fn()
const mockGetFavouritesActions = jest.fn()
const mockSaveFavouritesActions = jest.fn()
beforeEach(() => {
  fS
  .getFavouritesActions
  .mockReturnValue(mockGetFavouritesActions);

  fS
  .saveFavouritesActions
  .mockReturnValue(mockSaveFavouritesActions);
});

test("renders component correctly with no liked episodes", () => {
  
  let favourites = {
    favourites: [{
      "title": "The Kid Mero Talks 'What It Means To Be Latino'",
      "src": "https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/05/20210511_codeswitch_mero_interview_full_ljd_204pm_et_tues.mp3?orgId=1&d=1960&p=510312&story=991629761&t=podcast&e=991629761&size=31372897&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991629761",
      "isLiked": false
    }],isLoading: false}

  renderUserGreeter(favourites, mockDispatchFunction, mockSetPodcastFunction );


  const textElement = screen.getByText(/your favourites/i);
  expect(textElement).toBeInTheDocument();

  expect(mockGetFavouritesActions).toBeCalledWith(mockDispatchFunction)

  const textElement2 = screen.getByText(/no favourites added/i);
  expect(textElement2).toBeInTheDocument();

});

test("renders loading component", () => {
  

  let favourites = {
    favourites: [],isLoading: true}
  renderUserGreeter(favourites, mockDispatchFunction, mockSetPodcastFunction );

  const textElement = screen.getByText(/loading/i);
  expect(textElement).toBeInTheDocument();
});

test("renders component correctly with one liked episodes", () => {

  let favourites = {
    favourites: [{
      "title": "The Kid Mero Talks 'What It Means To Be Latino'",
      "src": "https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/05/20210511_codeswitch_mero_interview_full_ljd_204pm_et_tues.mp3?orgId=1&d=1960&p=510312&story=991629761&t=podcast&e=991629761&size=31372897&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991629761",
      "isLiked": true
    }],isLoading: false}

  renderUserGreeter(favourites, mockDispatchFunction, mockSetPodcastFunction );

  const textElement2 = screen.getByText(/The Kid Mero Talks 'What It Means To Be Latino/);
  expect(textElement2).toBeInTheDocument();

});

test("delete works", () => {

  let favourites = {
    favourites: [{
      "title": "The Kid Mero Talks 'What It Means To Be Latino'",
      "src": "https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/05/20210511_codeswitch_mero_interview_full_ljd_204pm_et_tues.mp3?orgId=1&d=1960&p=510312&story=991629761&t=podcast&e=991629761&size=31372897&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991629761",
      "isLiked": true
    },{
      "title": "Live From Philly*: A Code Switch Jawn",
      "src": "https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/04/20210427_codeswitch_philly_live_show_ljd_952pm_for_kumari.mp3?orgId=1&d=1673&p=510312&story=991352680&t=podcast&e=991352680&size=26778689&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991352680",
      "isLiked": true
    }],isLoading: false}

  renderUserGreeter(favourites, mockDispatchFunction, mockSetPodcastFunction );

  const textElement2 = screen.getAllByText(/Delete/);
  expect(textElement2).toHaveLength(2)

  fireEvent.click(textElement2[0]);
  
  expect(mockSaveFavouritesActions).toBeCalledWith(mockDispatchFunction)

});

test("load works", () => {

  let favourites = {
    favourites: [{
      "title": "The Kid Mero Talks 'What It Means To Be Latino'",
      "src": "https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/05/20210511_codeswitch_mero_interview_full_ljd_204pm_et_tues.mp3?orgId=1&d=1960&p=510312&story=991629761&t=podcast&e=991629761&size=31372897&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991629761",
      "isLiked": true
    },{
      "title": "Live From Philly*: A Code Switch Jawn",
      "src": "https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/04/20210427_codeswitch_philly_live_show_ljd_952pm_for_kumari.mp3?orgId=1&d=1673&p=510312&story=991352680&t=podcast&e=991352680&size=26778689&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991352680",
      "isLiked": true
    }],isLoading: false}

  renderUserGreeter(favourites, mockDispatchFunction, mockSetPodcastFunction );

  const textElement = screen.getAllByText(/Load/);
  expect(textElement).toHaveLength(2)

  fireEvent.click(textElement[0]);
  
  expect(mockSetPodcastFunction).toBeCalledWith({
    title:"The Kid Mero Talks 'What It Means To Be Latino'",
    url:"https://play.podtrac.com/npr-510312/edge1.pod.npr.org/anon.npr-mp3/npr/codeswitch/2021/05/20210511_codeswitch_mero_interview_full_ljd_204pm_et_tues.mp3?orgId=1&d=1960&p=510312&story=991629761&t=podcast&e=991629761&size=31372897&ft=pod&f=510312&awCollectionId=510312&awEpisodeId=991629761"
  })

});