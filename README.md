# hof-theme-govuk

## Usage

If you are using `hof-build` to build assets then you can add the following to your applications sass file.

```
@import "$$theme";
```

Otherwise add:

```
@import "hof-theme-govuk/styles/govuk";
```

(Note: is using npm-sass then the file path can be omitted, and only `@import: "hof-theme-govuk";` is required)

## Configuration

By default the compiled sass will attempt to load referenced images from `/public/images`. To override this, add the following to the top of your sass file (noting trailing slash):

```
$path: "/path/to/your/images/";
```
