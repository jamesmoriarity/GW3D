import { Provider } from "react-redux"
import { store } from "./app/store"
import { ControlPanel } from "./features/grid/Components/ControlPanel/ControlPanel"
import { Grid } from "./features/grid/Components/Grid/Grid"
import { HistoryControls } from "./features/grid/Components/HistoryControls/HistoryControls"
import { INPUTMODE_VALUES } from "./features/grid/Util/GridInputModes"

export const PuzzleSolver = function(){
    return(
        <Provider store={store}>
          <Grid/>
          <ControlPanel inputMode={INPUTMODE_VALUES}/>
          <HistoryControls />
        </Provider>
    )
}