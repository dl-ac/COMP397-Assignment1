module objects
{
    export abstract class Scene extends createjs.Container
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIS

        // CONSTRUCTOR
        constructor()
        {
            super();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Life Cycle Methods

        /**
         * This method is used for Initialization
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Start():void;

        /**
         * This method is used to update all child objects in the scene
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Update():void;

        /**
         * This method is where all the work happens for the scene
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Main():void;
    }
}