import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.less';
import './basic.less';

import SykmeldingSide from './pages/SykmeldingSide';

import useAppStore from './store/useAppStore';
import DataFetcher from './components/DataFetcher';
import TidslinjeSide from './pages/TidslinjeSide';
import KvitteringSide from './pages/KvitteringSide';

const App: React.FC = () => {
    return (
        <useAppStore.Provider>
            <DataFetcher>
                <BrowserRouter>
                    <Switch>
                        <Route path="/sykmeldinger/:id/kvittering" component={KvitteringSide} />
                        <Route path="/sykmeldinger/:id" component={SykmeldingSide} />
                        <Route exact path="/sykmeldinger" component={SykmeldingSide} />
                        <Route path="/tidslinje" component={TidslinjeSide} />
                    </Switch>
                </BrowserRouter>
            </DataFetcher>
        </useAppStore.Provider>
    );
};

export default App;
