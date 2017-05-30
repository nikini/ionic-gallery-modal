[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/ionic-gallery-modal)
[![NPM Version](http://img.shields.io/npm/v/ionic-gallery-modal.svg?style=flat)](https://www.npmjs.org/package/ionic-gallery-modal)
[![NPM Downloads](https://img.shields.io/npm/dm/ionic-gallery-modal.svg?style=flat)](https://www.npmjs.org/package/ionic-gallery-modal)

# Ionic Gallery Modal

It consists of a modal that will help you make gallery preview modal.
Last tested with Ionic 3.3.0

## Demo

![demo-ionic-3-gallery-modal](http://i.imgur.com/7iqiC1n.gif)

## Example

* [View live example](http://cip.chat/ionic-gallery-modal-demo/)
* [Fork example repository](https://github.com/nikini/ionic-gallery-modal-demo)

## Installation

Install it using npm

```
npm install ionic-gallery-modal --save
```

and then, within your application module 

```
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';
```

and add it to your declarations

```
declarations: [
  //...
  GalleryModal,
  ZoomableImage,
  //...
],
```

and to your entryComponents

```
entryComponents: [
  //...
  GalleryModal,
],
```

## Usage

To open the module just use the [Ionic ModalController](https://ionicframework.com/docs/v2/api/components/modal/ModalController/)

```
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';
```

```
let modal = this.modalCtrl.create(GalleryModal, {
  photos: photos,
  initialSlide: index
});
modal.present();
```

## Options

The possible options for it are:

```
{
  photos: Array[{ url: string }],
  closeIcon: string,
  initialSlide: number,
}
```

## Problems or suggestions
Let us know or submit a PR! And, please, don't hesitate to contribute. :heart:

## Changelog

#### v0.1.0
 * Changed to work with Ionic 3.2
 * Fixed an issue that was causing an error when building ionic app with `--prod` flag on
 * Changed the whole building system for the plugin

#### v0.0.7
 * Changed to work with Ionic 2 RC-5
 * Made a temporary fix for orientationchange bug in ios
 * Fixed a problem that was causing apps to not build

## Credits
Ciprian Mocanu - [@nikini](http://github.com/nikini)
