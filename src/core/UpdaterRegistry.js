export default class UpdaterRegistry {

	constructor( owner ) {

		this.namedUpdaters = new Map();
		this.updaters = [];
		this.owner = owner;

	}

	register( nameOrFunc, func ) {

		if ( typeof nameOrFunc === 'string' ) {

			this.registerByName( nameOrFunc, func );

		} else {

			this.registerByFunction( nameOrFunc );

		}

	}

	registerByName( name, func ) {

		this.namedUpdaters.set( name, func );
		this.registerByFunction( func );

	}

	registerByFunction( func ) {

		this.updaters.push( func );

	}

	unregister( nameOrFunc ) {

		if ( typeof nameOrFunc === 'string' ) {

			return this.unregisterByName( nameOrFunc );

		} else {

			return this.unregisterByFunction( nameOrFunc );

		}

	}

	unregisterByName( name ) {

		const updaterToRemove = this.namedUpdaters.get( name );
		if ( ! updaterToRemove ) {

			return false;

		}

		this.namedUpdaters.delete( name );
		return this.unregisterByFunction( updaterToRemove );

	}

	unregisterByFunction( func ) {

		const updaterToRemove = this.updaters.find( updater => updater === func );

		if ( ! updaterToRemove ) {

			return false;

		}

		this.updaters = this.updaters.filter( updater => updater !== updaterToRemove );
		return true;

	}

}
