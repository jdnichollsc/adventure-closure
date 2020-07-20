import { Loader } from 'phaser'
import { load } from 'webfontloader'

export class WebFontFile extends Loader.File {
  constructor (
    loader: Loader.LoaderPlugin,
    fontFamily: string | Array<string>
  ) {
		super(loader, {
			type: 'webfont',
			key: fontFamily.toString()
		})
	}

	load () {
		const config = {
      google: {
        families: this.key.split(',')
      },
			active: () => {
				this.loader.nextFile(this, true)
			}
		}
		load(config)
	}
}