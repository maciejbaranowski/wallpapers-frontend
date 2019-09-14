import WallpaperList from "./WallpaperList"
import renderer from 'react-test-renderer'
import { LoadingPane } from "./LoadingPane";
import Wallpaper from "./Wallpaper";

describe("Wallpaper List test", () => {
  const wallpapersData = [
    {
      quote:"Hello World",
      author:"John Smith",
      categoryName:"O niczym"
    },
    {
      quote:"Another one",
      author:"Adam Smith",
      categoryName:"O czyms"
    } 
  ];

  it("Should render loading pane when data not fetched", () => {
      const component = renderer.create(<WallpaperList />);

      expect(component.root.findAllByType(LoadingPane).length).toEqual(1);
  });
  it("Should render basic 2 wallpapers", () => {
      const component = renderer.create(<WallpaperList 
        page={0}
        wallpapersNumber={2}
        wallpapersPerPage={10}
        wallpapersList={wallpapersData}
        dataFetched={true}
      />);

      expect(component.root.findAllByType(LoadingPane).length).toEqual(0);
      const wallpapers = component.root.findAllByType(Wallpaper); 
      expect(wallpapers.length).toEqual(2);
      expect(wallpapers[0].findByType("h4").children[0]).toEqual("Hello World");
      expect(wallpapers[1].findByType("h6").children[1]).toEqual("O czyms");
  });

  it("Should render next button on main page if more wallpapers to come", () => {
    const component = renderer.create(<WallpaperList 
      page={0}
      wallpapersNumber={3}
      wallpapersPerPage={2}
      wallpapersList={wallpapersData}
      dataFetched={true}
    />);
    const wallpapers = component.root.findAllByType(Wallpaper); 
    expect(wallpapers.length).toEqual(2);
    expect(component.root.findByProps({href: "/?category=&page=1"}));
  });
});