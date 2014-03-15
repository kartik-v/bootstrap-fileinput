version 1.0.0
=============

Initial release. The following features are included in this release:

1. Convert any HTML input to a star rating control. Recommended input is of `type = number`, which will help fallback to a number input for browsers not supporting JQuery or Javascript.
2. The plugin automatically converts an input with `type = number` to a star rating control if you set its `class = rating`. All options to the input can be passed as HTML5 `data` attributes.
3. Involves pure CSS3 styling of the stars. Say goodbye to image sprites or playing with image backgrounds. Offers clean scalable vector icons for consistent display across devices.
4. Specifically uses Bootstrap 3.x styles & glyphs. Can be combined to work better for Bootstrap styled projects (or input group addons).
5. Ability to clear values and options for the stars. Control where the clear button element can be shown.
6. Reset star rating to the initial value when the form is reset.
7. Ability to control and display caption of the selected stars. Each rated star can have its own caption. Control where the caption element can be shown.
8. Ability to size the rating control including the stars, caption, and clear button. Five prebuilt size templates are available `xl`, `lg`, `md`, `sm`, and `xs`.
9. Support for RIGHT TO LEFT (RTL) input. Automatically changes star styling for RTL.
10. Triggers JQuery events for advanced development. Events currently available are `rating.change`, `rating.clear`, and  `rating.reset`.
11. Disabled and readonly input star rating support.
12. Size of the entire plugin is less than 9KB (about 6KB for the minified JS and 3KB for the minified CSS).