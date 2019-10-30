# gpx/klm to geoJson
Convert a directory with gpx or klm files into geoJson files
## Usage
``
$ npx toGeoJson -i gpx -d <input-directory> -o <output-directory>
``

## Parameters

```
-i  input type [gpx/klm] (default gpx)
-d  input directory (default cwd)
-o  output directory (default cwd)
```

## Acknowledgements
This script uses [toGeoJson](https://github.com/tmcw/togeojson) library under the hood

