/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WidgetApiImpl } from '@matrix-widget-toolkit/api';
import { getEnvironment, getNonce } from '@matrix-widget-toolkit/mui';
import i18next from 'i18next';
import { Settings } from 'luxon';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import './i18n';
import { widgetCapabilities } from './widgetCapabilities';

declare global {
  let __webpack_nonce__: string | undefined;
}

// Initialize webpack nonce to make sure that all style tags created by webpack
// include a nonce that suites our CSP.
__webpack_nonce__ = getNonce();

const version = getEnvironment('REACT_APP_VERSION');
if (version) {
  console.log(
    `You are running version "${version}" of the matrix-poll-widget!`
  );
}

Settings.defaultLocale = i18next.language;

i18next.on('languageChanged', () => {
  Settings.defaultLocale = i18next.language;
});

const widgetApiPromise = WidgetApiImpl.create({
  capabilities: widgetCapabilities,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContainer widgetApiPromise={widgetApiPromise} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
