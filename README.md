# opinary-challenge

Coding challenge for Opinary

## How to use

Here will be a link to Netlify with two demo pages

To get it up and running locally:

```bash
npm ci
npm run start
```

This will serve a demo page on `localhost:9000`.

To create a production-ready bundle (could be found in `dist`):

```bash
npm run build
```

## Solution

### Technologies

- Styled Components - CSS-in-JS, so that class names were not clashing with opriginal site's
- TypeScript — to avoid type-related errors and bugs, for purposes of writing self-documented code
- React — to refresh only necessary parts of the widget
- Webpack — to bundle it all to one minified bundle for usage on the page

### How to embed something in HTML without using an iframe

I’ve spent a half of an hour to get an answer since I haven’t perform that kind of tasks before. Usually I would install the dependency via npm, end of story. While trying different things, I’ve encountered that article, which I used as a reference for that task: https://blog.jenyay.com/building-javascript-widget/

This two sections took me ~2hrs in total to complete.

#### Embedding the script on a page

Add this to the HTML page:

```js
<script>
      (function (w,d,s,o,f,js,fjs) {
            w['PollWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'poll', './bundle.js')); // it's better to host the js bundle via CDN

        var configuration = {}; // here goes your configuration, leave it empty for a default question/options

        poll('init', configuration);
    </script>
```

#### Configuring question and options

We need to pass a configuration object with an `init` function like this:

```js
var pollConfiguration = {
  // it is of type Configurations, for the type definition see App.tsx
  question: "Is it working?",
  options: ["Yes, 100%", "Possibly", "Doesn't look like that"],
};
poll("init", pollConfiguration);
```

### Saving results to `localStorage`

So we have an extremely simple poll with 3 possible options. Now we have to count every vote from a user and save it to `localStorage`.

Suggested data structure:

```json
{
    [question: string]: {
        [option: string]: number
    }
}
```

This map should let us get the required number easily, without looking througout the array of questions, for example.

For manipulations with `localStorage` I've used custom hook, which I've already wrote for my prev coding assignment (it is not super-sophisticated though).
