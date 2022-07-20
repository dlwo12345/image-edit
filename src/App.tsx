import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import ImageEditOriginComponent from './pages/ImageEditOrigin/ImageEditOriginComponent'
import ImageEditMergeComponent from './pages/ImageEditMerge/ImageEditMergeComponent'
import ImageLocalStorageComponent from './pages/ImageLocalStorage/ImageLocalStorageComponent'
import ExifComponent from './pages/Exif/ExifComponent'
import ToastImageComponent from './pages/ToastImage/ToastImageComponent'
import ReactCropperComponent from './pages/ReactCropper/ReactCropperComponent'
import FabricComponent from './pages/Fabric/FabricComponent'
import FabricGridComponent from './pages/FabricGrid/FabricGridComponent'
import FabricMergeComponent from './pages/FabricMerge/FabricMergeComponent'
import FabricFilterComponent from './pages/FabricFilter/FabricFilterComponent'
import FabricUndoComponent from './pages/FabricUndo/FabricUndoComponent'
import FabricAlertComponent from './pages/FabricAlert/FabricAlertComponent'
import FabricClipPathComponent from './pages/FabricClipPath/FabricClipPathComponent'
import ReactDndComponent from './pages/ReactDnd/ReactDndComponent'
import DndKitComponent from './pages/DndKit/DndKitComponent'
import DndGridComponent from './pages/DndGrid/DndGridComponent'

import './App.css';
import Fabric2Component from './pages/Fabric2/Fabric2Component';

function App() {
  return (
    <>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ul style={{ textAlign: 'center' }}>
            {/* <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/dndkit">dnd-kit</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/dndgrid">DndGrid</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/reactdnd">react-dnd</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/image">image</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/merge">merge</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/save">save</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/exif">exif</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/toast">toast</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/reactcropper">react-cropper</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabric">Fabric</Link>
            </li> */}
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabric2">Fabric2</Link>
            </li>
            {/* <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricgrid">Fabricgrid</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricmerge">fabricmerge</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricfilter">fabricfilter</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricundo">fabricundo</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricclippath">fabricclippath</Link>
            </li>
            <li style={{ display: 'inline-block', border: '1px solid red', margin: '0 5px' }}>
              <Link to="/fabricalert">fabricAlert</Link>
            </li> */}


          </ul>
          <Switch>
            <Route exact path={`/dndkit`} component={DndKitComponent} />
            <Route exact path={`/dndgrid`} component={DndGridComponent} />
            <Route exact path={`/reactdnd`} component={ReactDndComponent} />
            <Route exact path={`/image`} component={ImageEditOriginComponent} />
            <Route exact path={`/merge`} component={ImageEditMergeComponent} />
            <Route exact path={`/save`} component={ImageLocalStorageComponent} />
            <Route exact path={`/exif`} component={ExifComponent} />
            <Route exact path={`/toast`} component={ToastImageComponent} />
            <Route exact path={`/reactcropper`} component={ReactCropperComponent} />
            <Route exact path={`/fabric`} component={FabricComponent} />
            <Route exact path={`/fabric2`} component={Fabric2Component} />
            <Route exact path={`/fabricgrid`} component={FabricGridComponent} />
            <Route exact path={`/fabricmerge`} component={FabricMergeComponent} />
            <Route exact path={`/fabricfilter`} component={FabricFilterComponent} />
            <Route exact path={`/fabricundo`} component={FabricUndoComponent} />
            <Route exact path={`/fabricclippath`} component={FabricClipPathComponent} />
            <Route exact path={`/fabricalert`} component={FabricAlertComponent} />
            <Route exact path={`/`}>
              <Redirect to="/fabric2" />
            </Route>
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
