# grunt-tag

[Grunt](http://gruntjs.com) task that create or move a git tag built from the version of package.json

## Using grunt-tag

**Tag using the version of the package.json file**

```shell
grunt tag
```

**Customize your tag:**

If you want to customize the name of the tag, you can set the `tagName` option:

```js
  tag: {
    options: {
      tagName: '<%= version.match(/\\d*/) %>.x' // E.g.: If version=1.2.0 then tagName will be 1.x
    }
  }
```

or by passing the CLI arg:

```shell
grunt tag --tagName "<%= version.match(/\d*/) %>.x"
```

**Dry Run:**
To see what grunt-tag does, without really changing anything, use `--no-write` option.

```shell
grunt tag --no-write
```

You'll see something like:
```
>> Tag dry run
>> Create or move the git tag: 1.0.0 (Version 1.0.0)
>> Push the tag 1.0.0 to remote

Done, without errors.
```

## Options
The following are the options of the grunt task:

```js
  tag: {
    options: {
        // Create or move the tag (default: true)
        tag: false,
        // Push the tag to remote (default: true)
        push: false,
        // File where th read the version (default: package.json)
        file: 'file.json',
        // Name of the tag (default: '<%= version %>')
        tagName: 'some-tag-<%= version %>',
        // Message of the tag (default: 'Version <%= version %>')
        tagMsg: 'New version: <%= version %>',   // default: 'Version <%= version %>'
        // The remote where to push the tag (default: 'origin')
        remote: 'RemoteName'
    }
  }
```

The CLI arguments `--tagName` and `--tagMsg` bypass the js options.


## License

Copyright (c) 2015 Sierra Wireless
Licensed under the MIT license.
