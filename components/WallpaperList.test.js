import WallpaperList from "./WallpaperList"
import renderer from 'react-test-renderer'
import { LoadingPane } from "./LoadingPane";
import Wallpaper from "./Wallpaper";

describe("Wallpaper List test", () => {
  it("Should render loading pane when data not fetched", () => {
      const component = renderer.create(<WallpaperList />);

      expect(component.root.findAllByType(LoadingPane).length).toEqual(1);
  });
  it("Should render basic 2 wallpapers", () => {
      const component = renderer.create(<WallpaperList 
        page={0}
        wallpapersNumber={2}
        wallpapersPerPage={10}
        wallpapersList={[
          {
            quote:"Hello World",
            author:"John Smith"
          },
          {
            quote:"Another one",
            author:"Adam Smith"
          }
        ]}
        dataFetched={true}
      />);

      expect(component.root.findAllByType(LoadingPane).length).toEqual(0);
      const wallpapers = component.root.findAllByType(Wallpaper); 
      expect(wallpapers.length).toEqual(2);
      expect(wallpapers[0].findByType("h4").children[0]).toEqual("Hello World");
  });
});