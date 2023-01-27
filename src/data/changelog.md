# Changelog

<!-- **Added** -->
<!-- **Changed** -->
<!-- **Deprecated** -->
<!-- **Fixed** -->
<!-- **Removed** -->
<!-- **Security** -->

## [5.11.11] - 2023-01-27
**Fixed**
- minor code fixes

## [5.11.10] - 2023-01-27
**Added**
- `Motion Detector` switch on Tobi bath/floor tab

**Fixed**
- some fixes to display changelog when version number increases

## [5.11.9] - 2023-01-26
**Added**
- dialog to display QR-Code for guest WiFi

## [5.11.8] - 2023-01-26
**Fixed**
- changelog dialog open by default even if changelog is empty
- minor fixes

## [5.11.7] - 2023-01-26
**Added**
- show new part of changelog in dialog when the user opens the start page

## [5.11.6] - 2023-01-25
**Changed**
- `Guest WiFi` module showing SSID and password instaead of QR-code

**Security**
- restricted some functions to admins only

## [5.11.5] - 2023-01-24
**Added**
- precision from user preferences in all modules

## [5.11.4] - 2023-01-23
**Added**
- QR code for guest WiFi on home tab

## [5.11.3] - 2023-01-23
**Added**
- Button to open Moode Web-UI

## [5.11.2] - 2023-01-23
**Security**
- remove default sign in credentials

## [5.11.1] - 2023-01-23
**Added**
- frontend version on sign in page

**Removed**
- backend version on settings tab

## [5.11.0] - 2023-01-23
**Added**
- user preferences
- live updats for user preferences

**Changed**
- Change backend from Strapi to PocketBase
- new authentication system

## [5.10.5] - 2022-12-11
**Fixed**
- some style fixes

## [5.10.4] - 2022-12-11
**Fixed**
- `Changelog` page

## [5.10.3] - 2022-12-11
**Added**
- add LED modes in `Ambient Light` module on `tobi-bathroom` tab

## [5.10.2] - 2022-12-11
**Added**
- `Dart` mode button

## [5.10.1] - 2022-12-10
**Added**
- shelly stats list tile for Pro Shellies

**Changed**
- split shelly stats into multiple modules

## [5.10.0] - 2022-12-09
**Added**
- Page to display rules (WIP)

**Fixed**
- re-add removed `Door Status` list tile
- minor fixes

## [5.9.0] - 2022-12-09
**Added**
- new color picker dialog for `Shelly Duo` lights
- `Floor` module on `Tobi Bathroom` tab to control ceiling light in floor (bathroom)
- `Light` module on `Tobi Bathroom` tab to control ceiling light in bathroom
- `Ceiling Light` module in `Tobi Living Room` tab to control ceiling lights
- new `Ceiling Light` button in `Toggles` module on `Tobi Living Room` tab

**Removed**
- old `Ceiling Light` button in `Toggles` module on `Tobi Living Room` tab

## [5.8.8] - 2022-12-06
**Added**
- new shellies in `Controllers` tab

## [5.8.7] - 2022-12-04
**Added**
- displaying `TW Moode` stats

**Fixed**
- displaying `Moode` stats

**Removed**
- `VPS` stats module
- `VPN` stats module
- `Weather` stats module
- `Server Rack` module

## [5.8.6] - 2022-11-29
**Fixed**
- minor fixes

## [5.8.5] - 2022-11-29
**Changed**
- make title of `Music` modules selectable

## [5.8.4] - 2022-11-20
**Fixed**
- displaying logig for `Music` modules
- grid layout breakpoints
- grid layout on `Tobi Living Room` tab

## [5.8.3] - 2022-11-29
**Fixed**
- list rules
- enable/disable rules

## [5.8.2] - 2022-11-28
**Changed**
- Moode URLs changed to proxy server to allow external access

## [5.8.1] - 2022-11-28
**Fixed**
- config

## [5.8.0] - 2022-11-28
**Added**
- add `Music` module on `Living Room` tab
- add `Music` module on `Tobi Living Room` tab

**Changed**
- finished `Music` module

## [5.7.0] - 2022-11-28
**Added**
- show API versions & statuses

**Removed**
- unfinished `Music` module

## [5.6.9] - 2022-11-26
**Fixed**
- app crashing on info tab

## [5.6.8] - 2022-11-20
**Added**
- `Plant Pot 1` ambient light
- `Plant Pot 2` ambient light
- Display firmware version for devices in `Controllers` module

**Changed**
- change brightness control max value from `100` to `255`

## [5.6.7] - 2022-11-20
**Fixed**
- display correct user info in `Profile` module

## [5.6.6] - 2022-11-20
**Added**
- `PVE` stats module including complete network traffic
- `Network Traffic` module with network stats by interface

**Fixed**
- Fixed some modules to be only accessible by admins

## [5.6.5] - 2022-11-19
**Added**
- more detailed controller stats
- stats for `esp-tobi-plant-pots`

**Changed**
- rename `esp-tobi-server-rack` to `esp-tobi-sideboard`

## [5.6.4] - 2022-11-11
**Fixed**
- change implementation of authentication/authorization (not yet finished)

## [5.6.3] - 2022-08-28
**Added**
- `MQTT Broker stats` module

## [5.6.2] - 2022-08-28
**Added**
- subscribe to some `$SYS` topics in middleware

**Changed**
- add styling for `<code>` elements used e.g. in changelog

**Fixed**
- change storage value prefixes from like `GB` to `GiB`

## [5.6.1] - 2022-08-28
**Added**
- display Controller info in controller list tile

**Fixed**
- IP list tile

## [5.6.0] - 2022-08-28
**Changed**
- display Shelly info in shelly list tile instead of separate Shelly info modules

**Removed**
- separate Shelly info modules

## [5.5.2] - 2022-08-20
**Added**
- `server-rack` shelly in devices list

## [5.5.1] - 2022-08-20
**Fixed**
- minor fixes

## [5.5.0] - 2022-08-20
**Added**
- `Main Power` module to `Home` tab
- Basic controls in `Working Room` tab

**Fixed**
- ESP's and Shellies in `Controllers` tab

## [5.4.3] - 2022-08-18
**Fixed**
- `Outlets Desk` topic

## [5.4.2] - 2022-08-16
**Added**
- Garden Led list tile

**Fixed**
- Authentication issues

## [5.4.1] - 2022-08-13
**Changed**
- update shellies list
- update ESPs list

**Removed**
- `garden-led` shelly

## [5.4.0] - 2022-08-13
**Added**
- `esp-world-map` in controllers
- `Rules` module and option to enable/disable rules

## [5.3.0] - 2022-07-29
**Added**
- World-Map list tile in 'Ambient Light' module

**Changed**
- Improve color picker dialog to handle RGBW

## [5.2.1] - 2022-07-25
**Added**
- add tobiPc to VPN clients

## [5.2.0] - 2022-07-24
**Added**
- VPN module in Info tab to show stats and connected clients with rx & tx bytes

## [5.1.9] - 2022-06-27
**Added**
- `esp-tobi-windowsill` to Controllers tab

## [5.1.8] - 2022-06-24
**Added**
- `Solar System` in Ambient Light module
- `Sensors` module

## [5.1.7] - 2022-06-10
**Security**
- add proxy middleware with authentication to protect the VU+ stream and later the ESP-Cam streams

## [5.1.6] - 2022-06-04
**Fixed**
- refacor switch list tiles

**Removed**
- old switch list tile

## [5.1.5] - 2022-06-04
**Fixed**
- minor UI fixes
- refactor LED list tiles

## [5.1.4] - 2022-06-04
**Fixed**
- some UI problems caused by migration from Material-UI to MUI

## [5.1.3] - 2022-06-04
**Added**
- Shelly RGBW list tile

**Changed**
- Color Picker Dialog
- migrate from Material-UI to MUI

**Removed**
- Energy Data tab
- `Smarthome` module on stats tab
- workbox logging in dev mode
- `Add Energy Data` shortcut on manifest.json
- console logs in production build

**Security**
- fixed some HTTP security hotspots

## [5.1.2] 2022-06-02
**Fixed**
- swipeability of controllers tab
- appbar background color on changelog page
- favicon path

## [5.1.1] - 2022-05-31
**Added**
- `Server Rack` module on stats tab
  - power consumption display
  - fan control

**Removed**
- `Fans` module on stats tab

## [5.1.0] - 2022-05-31
**Added**
- garden shed
  - ceiling light
  - working light
  - amplifier
  - stove
  - fountain
- `Backup Usage` on stats tab in `NAS` module

**Changed**
- shelly switch list tile can now show power consumption
- `Outlets Bed` are now shelly driven
- `Screens` are now shelly driven

**Fixed**
- major improvements and fixes
- first production push to server

**Removed**
- energy data tab (will show shelly power comsumptions in the future)
- `Smarthome` module on stats tab

## [5.0.28] - 2022-04-09
**Added**
- periodically update rules `UPDATE_RULES_CLOCK_SECONDS`

**Changed**
- major middleware refactoring

**Fixed**
- execution of rules
  - max. 1000 rules will be fetched
  - max. 1000 per rule will be fetched
  - max. 1000 actions per rule will be fetched
- minor performance improvements
- minor frontend fixes

## [5.0.27] - 2022-04-03
**Added**
- Working Room tab
  - toggles module
  - octopi stats module
  - sensors module
  - printer info module
- custom value list tile

## [5.0.26] - 2022-03-29
**Fixed**
- code smells

## [5.0.25] - 2022-03-29
**Added**
- 'tobi bathroom' tab
  - ambient light module
  - sensors module

## [5.0.24] - 2022-03-29
**Added**
- 'knock' mode on door status

**Fixed**
- minor fixes

## [5.0.23] - 2022-03-28
**Added**
- door status list tile in quick access module

## [5.0.22] - 2022-03-28
**Fixed**
- **massive** performance improvement in frontend and middleware by sending required values only
- fetch shelly status if module is not expanded
- color picker dialog
- minor fixes

## [5.0.21] - 2022-03-24
**Added**
- readme

**Fixed**
- icons
- auth guard
- minor fixes

## [5.0.20] - 2022-03-24
**Changed**
- refactor settings tab

## [5.0.19] - 2022-03-24
**Added**
- IP/MAC list tile
- function to format MAC address with colon separated segments

**Changed**
- add 'dense' property to connection state icon
- refactor controller status list tile
- refactor shelly status list tile
- refactor static value list tile
- refactor shellies stats modules

## [5.0.18] - 2022-03-24
**Added**
- static progress value list tile

**Changed**
- refactor temperature value list tile
- refactor value list tile
- refactor progress value list tile


## [5.0.17] - 2022-03-23
**Added**
- value only list tile
- progress value list tile
- NAS stats module
- connection state icon component
- connection state icon bottom component
- shellies stats modules

**Fixed**
- shelly status list tile
- shellies stats module

## [5.0.16] - 2022-03-23
**Added**
- shellies stats module

## [5.0.15] - 2022-03-23
**Added**
- computer module

## [5.0.14] - 2022-03-22
**Added**
- shutters module

## [5.0.13] - 2022-03-22
**Added**
- shelly switch list tile
- Toggles module

**Fixed**
- minor fixes

## [5.0.12] - 2022-03-20
**Added**
- color picker dialog
- LED list tile
- Tobi Living Room tab
- Ambient Light module

**Changed**
- SwitchListTile &rarr; OldSwitchListTile
- NewSwitchListTile &rarr; SwitchListTile

## [5.0.11] - 2022-03-18
**Added**
- Controller status list tile
- Controller stats module

## [5.0.10] - 2022-03-18
**Added**
- PWA support
- Switch list tile
- Garden tab
- Garden Shed module
- Lawn Mower module
- Outside module

**Removed**
- MUI v5

## [5.0.9] - 2022-03-17
**Added**
- Living Room tab
- Sensors module
- TV module

## [5.0.8] - 2022-03-17
**Fixed**
- dynamically render title of weather station sensor module

## [5.0.7] - 2022-03-17
**Added**
- Home Tab
- Heating System module
- Weather Station module
- Weather Station Wind Module
- Weather Station Sensor module

## [5.0.6] - 2022-03-16
**Removed**
- graphql

## [5.0.5]
**Added**
- Preferences collection to store system wide preferences

## [5.0.4] - 2022-03-16
**Added**
- changelog page

## [5.0.3] - 2022-03-16
**Fixed**
- center svg in icon component

## [5.0.2] - 2022-03-16
**Changed**
- render expandable card only if mounted to prevent animation on tab change

## [5.0.1] - 2022-03-15
**Added**
- changelog
- changelog icon

**Changed**
- start rewriting the app with in Next.js and Strapi