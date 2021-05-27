import { render, screen } from "@testing-library/react"
import { PodcastContext } from "../../../podcastContext";
import PodcastPlayer from "./PodcastPlayer"

function renderPodcastPlayer () {
  const podcast = {
    title: "Podcast Title", 
    url: "https://play.test.url"
  }
  render(
  <PodcastContext.Provider value={{podcast}}>
    <PodcastPlayer />
  </PodcastContext.Provider>
  )
}

test('component renders with title', () => {
  renderPodcastPlayer()
  const textElement = screen.getByText(/Podcast Title/);
  expect(textElement).toBeInTheDocument()
})

test('component renders with correct src', () => {
  renderPodcastPlayer()
  const textElement = screen.getByTestId('podcast-player');
  expect(textElement).toHaveAttribute('src','https://play.test.url')
})
