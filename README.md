# Getting Started with Crestron UI

An example React component communicating with the Crestron using the Crestron-CH5 library:

```js
import {useDigitalState, usePublishDigital} from 'hooks';

export default function ProjectorControls(_props: Props): MixedElement {
  const screenDownState = useDigitalState('23');
  const screenUpState = useDigitalState('24');

  const handleDownStateClick = usePublishDigital('23', 1000);
  const handleUpStateClick = usePublishDigital('24', 1000);

  return (
    <ButtonWrapper>
      <Button
        label="Open"
        isDisabled={screenUpState}
        onClick={handleDownStateClick}
      />
      <Button
        label="Retract"
        isDisabled={screenDownState}
        onClick={handleUpStateClick}
      />
    </ButtonWrapper>
  );
}
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn flow`

Runs Flow type checker.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

If it fails to find the crcomlib package, check @crcomlib config at `@crestron/ch5-crcomlib/node_modules/package.json` and ensure that `"types"` and `"main"` are set properly.

![package error](./readme-assets/package-not-found.png)

They should be set to:

```json
"types": "build_bundles/cjs/@types/index.d.ts",
"main": "build_bundles/cjs/cr-com-lib.js",
```
Add any missing lines as necessary.

### `yarn shayona:archive`

Creates the ch5z archive file. Make sure to update `REACT_APP_ROOM_CONFIG_NAME=` to the correct room config name in the `.env.development` file. Run this command only after you have run `yarn build`.

Change the name of project as needed based on what you want to build, for example if you want to build ch5z for for studio replace `shayona:archive` with `studio:archive`. You can create additional scripts in `package.json` as necessary. This ia a wrapper function for `ch5-cli`, use `ch5-cli archive -h` to see parameter options. 

If you get an error running the command line interface for the crestron html5 utilities cli, run `npm i -g @crestron/ch5-utilities-cli` to install it globally. 

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
