# Simple Changelog

<!-- project badges -->
![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=alert_status&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)
![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=security_rating&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)
![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=vulnerabilities&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)
![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=bugs&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)
![Lines of Code](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=ncloc&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)
![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=duplicated_lines_density&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)
![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_vscode-simple-changelog_AYbOLx8mMsG9aSOZ5fok&metric=sqale_rating&token=sqb_adb2fbe59d0cb921284c7dc45c8da804261960c7)

This extension helps you creating consistent changelogs. With many customization options you can look at the changelog however you want. Feel free to customize the icons and colors or try out flatten the tree structure or even change the date format.

![Overview](assets/images/overview.png)

The extension checks all folders in of your workspaces if a `CHANGELOG.md` (case-insensitive) file exists (include/exclude regexes are customizable). They are listet in the tree view by the name of folders where they are found. \
When hovering over the tree items you get the options to add or edit items. Items can be deleted over the context menu.

Whenever you add or change an item, the corresponding changelog file will be updated immediately. The file is formatted according to the convention from [keepachangelog.com](https://keepachangelog.com).\
By default, there is an attribution to this extension right below the title. There are configuration options to turn it into a markdown comment, change its position in the file or completely remove it. **Please notice that my aim is to make changelogs on the internet more consistent** and not to bother you with advertising my extension. 😊

If you have any ideas how this extension could be improved, feel free to [open an issue](https://github.com/tobiaswaelde/vscode-simple-changelog/issues) or get in touch with me. 

## Configuration

*All keys starting with `simpleChangelog.`*

| Settings key               | Type                            | Default Value     | Description                                                                                                          |
| -------------------------- | ------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| icons.color.enabled        | boolean                         | `true`            | Enable/disable color on icons in changelog.                                                                          |
| icons.addition.icon        | string                          | `add`             | The icon for the `Additions` section.                                                                                |
| icons.addition.color       | string                          | `charts.blue`     | The color of the `Additions` icon.                                                                                   |
| icons.change.icon          | string                          | `edit`            | The icon for the `Changes` section.                                                                                  |
| icons.change.color         | string                          | `charts.yellow`   | The color of the `Changes` icon.                                                                                     |
| icons.deprecation.icon     | string                          | `discard`         | The icon for the `Deprecations` section.                                                                             |
| icons.deprecation.color    | string                          | `charts.purple`   | The color of the `Deprecations` icon.                                                                                |
| icons.fix.icon             | string                          | `debug`           | The icon for the `Fixes` section.                                                                                    |
| icons.fix.color            | string                          | `charts.green`    | The color of the `Fixes` icon.                                                                                       |
| icons.removal.icon         | string                          | `circle-slash`    | The icon for the `Removals` section.                                                                                 |
| icons.removal.color        | string                          | `charts.red`      | The color of the `Removals` icon.                                                                                    |
| icons.securityChange.icon  | string                          | `warning`         | The icon for the `Security Changes` section.                                                                         |
| icons.securityChange.color | string                          | `charts.orange`   | The color of the `Security Changes` icon.                                                                            |
| icons.item.icon            | string                          | `circle-filled`   | The icon for the changelog items.                                                                                    |
| icons.item.enabled         | boolean                         | `false`           | Enable/disable type icons on items.                                                                                  |
| groupsOpenByDefault        | boolean                         | `true`            | If set to `true`, groups are open by default when opening version.                                                   |
| searchIncludeRegex         | string                          | `/changelog.md/i` | The regex used to search workspace folders for changelog files.                                                      |
| searchExcludeRegex         | string                          | `/node_modules/`  | The regex used exlude folders in search for changelog files.                                                         |
| dateFormat                 | string                          | `YYYY-MM-DD`      | The date format. See [Moment.js Documentation](https://momentjs.com/docs/#/displaying/format/) for more information. |
| attribution.visibility     | `visible` \| `hidden` \| `none` | `visible`         | Choose how the attribution to the extension should be displayed.                                                     |
| attribution.placement      | `top` \| `bottom`               | `top`             | Choose where the attribution to the extension should be displayed.                                                   |


## Attributions
### Icons
- [Return icons created by Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/return)